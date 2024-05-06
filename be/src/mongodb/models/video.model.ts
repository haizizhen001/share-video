import type { Connection, Document } from 'mongoose';
import { Schema } from 'mongoose';

const videoSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    link: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const videoProvider = [
  {
    provide: 'VIDEO_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Video', videoSchema),
    inject: ['MAIN_MONGO_CONNECTION'],
  },
];

export interface IVideo extends Document {
  _id: string;
  title: string;
  content: string;
  link: string;
  userId: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}
export { videoProvider, videoSchema };
