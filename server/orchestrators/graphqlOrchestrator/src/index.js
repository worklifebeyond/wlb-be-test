'use strict';

const { ApolloServer } = require('apollo-server');
const schema = require('./schema');
const resolvers = require('./resolvers');
const UsersAPI = require('./dataSources/usersAPI');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources() {
    return {
      usersAPI: new UsersAPI(),
    };
  },
});

server
  .listen(3000)
  .then(({ url }) => {
    console.log(`graphqlOrchestrator running at ${url}`);
  })
  .catch(err => console.log(err));
