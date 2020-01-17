import auth from './auth/resolvers';
import user from './user/resolvers';

export default Object.assign(auth, user);
