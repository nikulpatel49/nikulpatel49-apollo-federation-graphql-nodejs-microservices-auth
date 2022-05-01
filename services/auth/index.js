require('dotenv').config();
const { ApolloServer, gql } = require("apollo-server");
const { applyMiddleware } = require("graphql-middleware");
const { buildFederatedSchema } = require("@apollo/federation");
const port = process.env.AUTH_SERVICE_PORT;
const mongoose = require('mongoose');
const db = require('../../config/key').mongoURI;
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

startApolloService = async () => {
  await mongoose.connect(db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
  const server = new ApolloServer({
    schema: applyMiddleware(schema),
    context: ({ req }) => {
      const user = req.headers.user ? JSON.parse(req.headers.user) : null;
      return { user };
    }
  });
  server.listen({ port }).then(({ url }) => {
    console.log(`Auth service ready at ${url}`);
  });

}
startApolloService();

