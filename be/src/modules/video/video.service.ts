import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IVideo } from 'src/mongodb/models/video.model';
import { VideoGateway } from './video.gateway';
import { ShareVideoPayloadDto } from './dto/videoPayloadDto';

@Injectable()
export class VideoService {
  constructor(
    @Inject('VIDEO_MODEL') private videoModel: Model<IVideo>,
    private videoGateway: VideoGateway,
  ) {}

  async create(video: ShareVideoPayloadDto, email: string, userId: string): Promise<IVideo> {
    const videoData = {
      title: video.title,
      content: video.content,
      link: video.link,
      email,
      userId
    } as IVideo;
    try{
      const resultVideo = await this.videoModel.create(videoData);
      if (resultVideo) {
        const message = {
          type: 'shared',
          data: video,
        };
        this.videoGateway.server.emit('message', JSON.stringify(message));
        return resultVideo;
      }
    } catch (e) {
      throw e;
    }
    
  }
  async findAll(): Promise<IVideo[]> {
    return await this.videoModel.find().lean();
  }
}
