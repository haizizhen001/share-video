import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { VideoGateway } from './video.gateway';
import { MongoDbModule } from 'src/mongodb/mongodb.module';
import { videoProvider } from 'src/mongodb/models/video.model';

@Module({
  imports: [MongoDbModule],
  controllers: [VideoController],
  providers: [VideoService, VideoGateway, ...videoProvider],
  exports: [VideoService],
})
export class VideoModule {}
