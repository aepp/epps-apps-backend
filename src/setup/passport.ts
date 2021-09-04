import passport from 'passport';
import {Strategy} from 'passport-twitter';
import {Globals} from '../globals';
import {TwitterUserModel} from '../models/TwitterUser';

passport.serializeUser((user, done) => {
  done(null, user.twitterId);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id: string, done) => {
  TwitterUserModel.findOne({
    twitterId: id
  })
    .then(user => {
      return done(null, user);
    })
    .catch(e => {
      console.error('Failed to deserialize an user', e);
      return done(new Error('Failed to deserialize an user'));
    });
});

export default passport.use(
  new Strategy(
    {
      consumerKey: Globals.twitter.apiKey,
      consumerSecret: Globals.twitter.apiSecretKey,
      callbackURL: Globals.twitter.callbackUrl
    },
    async (token, tokenSecret, profile, done) => {
      // find current user in UserModel
      const currentUser = await TwitterUserModel.findOne({
        twitterId: profile._json.id_str
      });
      // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new TwitterUserModel({
          name: profile._json.name,
          screenName: profile._json.screen_name,
          twitterId: profile._json.id_str,
          profileImageUrl: profile._json.profile_image_url
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  )
);

// import {Profile, Strategy} from 'passport-github2';
// import { VerifyCallback } from "passport-oauth2";
//
// passport.serializeUser(function(user: Express.User, done) {
//   done(null, user);
// });
// passport.deserializeUser(function(user: Express.User, done) {
//   done(null, user);
// });
//
// export default passport.use(
//   new Strategy(
//     {
//       clientID: process.env.EA_GITHUB_CLIENT_ID || '',
//       clientSecret: process.env.EA_GITHUB_SECRET || '',
//       callbackURL: process.env.EA_GITHUB_CALLBACK_URL || ''
//     },
//     function(
//       accessToken: string,
//       refreshToken: string,
//       profile: Profile,
//       done: VerifyCallback
//     ) {
//       return done(null, profile);
//     }
//   )
// );
