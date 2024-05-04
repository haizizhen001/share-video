import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { VideoService } from './video.service';
import { ResponseDto } from 'src/shared/dto/apiPayloadDto';
import { ShareVideoPayloadDto } from './dto/videoPayloadDto';
import { AuthUser, IUserAuth } from 'src/shared/decorator/authUser.decorator';

@Controller('video')
@ApiTags('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Post('share')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Share video',
    type: ResponseDto,
  })
  @UseGuards(AuthGuard('jwt'))
  async shareVideo(
    @Body() shareVideoPayload: ShareVideoPayloadDto,
    @AuthUser() user: IUserAuth,
  ) {
    try {
      await this.videoService.create(
        shareVideoPayload,
        user.email,
        user.userId,
      );
      return {
        code: 0,
        message: 'Video shared successfully',
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get all videos',
    type: ResponseDto,
  })
  async getAllVideos() {
    try {
      const videos = await this.videoService.findAll();
      return {
        code: 0,
        message: 'Get all videos successfully',
        data: videos,
      };
    } catch (e) {
      throw e;
    }
  }
}
