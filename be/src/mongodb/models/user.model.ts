import type { Connection, Document } from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
    },
    userName: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
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

const userProvider = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', userSchema),
    inject: ['MAIN_MONGO_CONNECTION'],
  },
];

export interface IUser extends Document {
  _id: string;
  email: string;
  name: string;
  userName: string;
  password: string;
}
export { userProvider, userSchema };
