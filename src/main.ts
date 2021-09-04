import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import path from 'path';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import routes from './routes';
import {api} from './api';
import setup from './setup';
import {Globals} from './globals';

// Create our express app using the port optionally specified
const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

app.use(
  cors({
    origin: Globals.clientHomePageUrl, // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);

app.use(
  cookieSession({
    name: 'session',
    keys: ['mYsECreT'],
    maxAge: 24 * 60 * 60 * 100
  })
);

// parse cookies
app.use(cookieParser());

app.use(setup.passport.initialize());
app.use(setup.passport.session());

app.use((req: Request, res, next) => {
  req.context = {};
  next();
});

app.use(api.auth.root, routes.auth);

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: 'user has not been authenticated'
    });
  } else {
    next();
  }
};

app.get('/', authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: 'user successfully authenticated',
    user: req.user,
    cookies: req.cookies
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(fs.realpathSync('./build')));

  app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// import {ApolloServer} from 'apollo-server';
//
// import resolvers from './graphql/modules/resolvers';
// import typeDefs from './graphql/modules/types';
//
// const server = new ApolloServer({
//   resolvers,
//   typeDefs
// });
//
// server.listen()
//   .then(({url}) => console.log(`Server ready at ${url}. `));
//
// if (module.hot) {
//   module.hot.accept();
//   module.hot.dispose(() => server.stop());
// }
