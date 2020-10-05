import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro';
import { MongoClient, Db } from 'mongodb';

import Mutation from '../../graphql/mutation';
import Query from '../../graphql/query';

const typeDefs = gql`
  type Query {
    getHello: String
  }

  type Mutation {
    sayHello: Boolean
  }
`;

const resolvers = {
  Query,
  Mutation,
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

let db: Db;

const apolloServer = new ApolloServer({
  schema,
  context: async () => {
    if (!db) {
      try {
        /**
         * Create db client and set into context
         */
        const dbClient = new MongoClient('mongodb://localhost:27017/', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        if (!dbClient.isConnected()) await dbClient.connect();
        db = dbClient.db('aselecat'); // database name
      } catch (e) {
        console.log('--->error while connecting with graphql context (db)', e);
      }
    }

    return { db };
  },
  playground: process.env.NODE_ENV === 'production' ? false : true,
});
export const config = {
  api: {
    bodyParser: false,
  },
};
export default apolloServer.createHandler({ path: '/api/graphql' });
