require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { applyMiddleware } = require("graphql-middleware");
const { buildFederatedSchema } = require("@apollo/federation");
const db = require("../../config/key").mongoURI;
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const port = process.env.USER_SERVICE_PORT;
const { and, or, rule, shield } = require("graphql-shield");
const { isAuthenticated } = require("../auth/authentication");

const authorization = shield({
	Query: {
		users: isAuthenticated,
		user: isAuthenticated,
	},
	Mutation: {
		"*": isAuthenticated,
	},
});

startApolloService = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});

		const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
		const server = new ApolloServer({
			schema: applyMiddleware(schema, authorization),
			context: ({ req }) => {
				const user = req.headers.user
					? JSON.parse(req.headers.user)
					: null;
				return { user };
			},
		});
		server.listen({ port }).then(({ url }) => {
			console.log(`User service ready at ${url}`);
		});
	} catch (error) {}
};
startApolloService();
