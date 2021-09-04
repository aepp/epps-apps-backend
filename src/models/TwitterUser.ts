import {Document, Schema, model} from 'mongoose';

export interface ITwitterUser {
  name: string;
  screenName: string;
  twitterId: string;
  profileImageUrl: string;
}
export interface ITwitterUserDocument extends ITwitterUser, Document {}

// Create Schema
const TwitterUserSchema = new Schema<ITwitterUserDocument>({
  name: String,
  screenName: String,
  twitterId: String,
  profileImageUrl: String
});

export const TwitterUserModel = model<ITwitterUserDocument>(
  'twitterUsers',
  TwitterUserSchema
);
