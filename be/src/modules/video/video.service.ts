import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IVideo } from 'src/mongodb/models/video.model';
import { VideoGateway } from './video.gateway';
import { ShareVideoPayloadDto } from './dto/videoPayloadDto';
import * as urlMetadata from 'url-metadata';

@Injectable()
export class VideoService {
  constructor(
    @Inject('VIDEO_MODEL') private videoModel: Model<IVideo>,
    private videoGateway: VideoGateway,
  ) {}

  async create(
    video: ShareVideoPayloadDto,
    email: string,
    userId: string,
  ): Promise<IVideo> {
    try {
      const videoData = await this.getInforVideo(video.link);
      videoData.email = email;
      videoData.userId = userId;
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
  async getInforVideo(link: string): Promise<IVideo> {
    try {
      const metadata = await urlMetadata(link);
      console.log(metadata);
      const video = {
        title: metadata.title,
        content: metadata.description,
        link: metadata['og:video:url'],
      } as IVideo;
      return video;
    } catch (err) {
      throw err;
    }
  }
  async findAll(): Promise<IVideo[]> {
    return await this.videoModel.find().lean();
  }
}
