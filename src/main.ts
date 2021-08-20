import express, {Request, Response} from 'express';
import path from 'path';
import fs from 'fs';

// Create our express app using the port optionally specified
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(fs.realpathSync('./build')));

app.get('/api/*', (req: Request, res: Response) => {
  return res.send('Received an API request');
});

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

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
