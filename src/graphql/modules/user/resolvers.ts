import {User} from './types';

const users = [
  {
    _id: 'Harry Potter and the Chamber of Secrets',
    email: 'J.K. Rowling'
  },
  {
    _id: 'Jurassic Park',
    email: 'Michael Crichton'
  }
];

export default {
  User: {
    _id: (user: User): string => user._id,
    username: (user: User): string => user.username || ''
  },
  getUsers: (): Array<User> => users
};
