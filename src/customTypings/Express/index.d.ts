import {ITwitterUser} from '../../models/TwitterUser';

declare global {
  namespace Express {
    interface Request {
      context?: any;
      returnUrlAfterAuth?: string;
    }

    interface User extends ITwitterUser {}
  }
}
