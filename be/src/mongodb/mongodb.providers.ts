import type { ConnectOptions } from 'mongoose';
import { createConnection } from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const mongodbProviders = [
  {
    provide: 'MAIN_MONGO_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const middlewareUrl = configService.get('DATABASE_MONGO_CONNECTION');
      const config = {
        useUnifiedTopology: true,
        retryReads: true,
      } as ConnectOptions;
      return createConnection(middlewareUrl, config);
    },
  },
];
