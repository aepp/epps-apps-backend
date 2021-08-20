import express, {Request, Response} from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import {api} from './api';

// Create our express app using the port optionally specified
const app = express();
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(fs.realpathSync('./build')));

  app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
  });
}

const allowList = ['http://localhost:3034', 'http://localhost', 'localhost'];
const corsOptionsDelegate = function(req: Request, callback: Function) {
  let corsOptions;
  const origin = req.header('Origin') || '';

  if (allowList.indexOf(origin) !== -1) {
    corsOptions = {origin: true}; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = {origin: false}; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// app.use(cors(corsOptionsDelegate));
app.get(api.auth, cors(corsOptionsDelegate), (req: Request, res: Response) => {
  console.log('Received an AUTH request');
  return res.json({msg: 'Received an AUTH request!'});
});

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
