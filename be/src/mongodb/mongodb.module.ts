import { Module } from '@nestjs/common';

import { mongodbProviders } from './mongodb.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [...mongodbProviders],
  exports: [...mongodbProviders],
})
export class MongoDbModule {}
