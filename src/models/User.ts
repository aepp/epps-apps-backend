import {Document, Schema, model} from 'mongoose';

export interface IProviderData {
  getUniqueIdentifier: (data: IProviderData) => {};
}

const ProviderDataSchema = new Schema<IProviderData>({});
ProviderDataSchema.methods.getUniqueIdentifier = () => null;

// export interface IThirdPartyProviderSchema {
//   providerName: string;
//   providerId: string;
//   providerData?: object;
// }
//
// const ThirdPartyProviderSchema = new Schema<IThirdPartyProviderSchema>({
//   providerName: {
//     type: String,
//     default: null
//   },
//   providerId: {
//     type: String,
//     default: null
//   },
//   providerData: {
//     type: {},
//     default: null
//   }
// });

export interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  emailIsVerified: boolean;
  password: string;
  referralCode: string;
  referredBy: string;
  providerData?: IProviderData;
  // thirdPartyAuth: IThirdPartyProviderSchema;
  date: Date;
}

const options = {discriminatorKey: 'providerId', strict: false};

// Create Schema
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    emailIsVerified: {
      type: Boolean,
      default: false
    },
    password: {
      type: String
    },
    referralCode: {
      type: String,
      default: function(this: IUser) {
        let hash = 0;
        for (let i = 0; i < this.email.length; i++) {
          hash = this.email.charCodeAt(i) + ((hash << 5) - hash);
        }
        let res = (hash & 0x00ffffff).toString(16).toUpperCase();
        return '00000'.substring(0, 6 - res.length) + res;
      }
    },
    referredBy: {
      type: String,
      default: null
    },
    providerData: {
      type: ProviderDataSchema,
      default: null
    },
    // thirdPartyAuth: ThirdPartyProviderSchema,
    date: {
      type: Date,
      default: Date.now
    }
  },
  options
);

export const UserModel = model<IUser>('Users', UserSchema);
