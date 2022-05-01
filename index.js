require("dotenv").config();
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const keys = require("./config/key");
const passport = require("passport");
const cors = require("cors");
const port = process.env.GRAPHQL_PORT;
const app = express();
const db = require("./config/key").mongoURI;

// Connect to mongoDB
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Successfully connect to MongoDB.");
	})
	.catch((err) => console.log(err));
// cache clear
app.use(cors({ origin: "*" }));
// Body Parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

const gateway = new ApolloGateway({
	serviceList: [
		{
			name: "auth",
			url: `${process.env.GRAPHQL_SERVER_URI}:${process.env.AUTH_SERVICE_PORT}`,
		},
		{
			name: "users",
			url: `${process.env.GRAPHQL_SERVER_URI}:${process.env.USER_SERVICE_PORT}`,
		},
		{
			name: "roles",
			url: `${process.env.GRAPHQL_SERVER_URI}:${process.env.ROLE_SERVICE_PORT}`,
		},
	],

	buildService({ name, url }) {
		return new RemoteGraphQLDataSource({
			url,
			willSendRequest({ request, context }) {
				request.http.headers.set(
					"user",
					context.user ? JSON.stringify(context.user) : null
				);
			},
		});
	},
});

const server = new ApolloServer({
	gateway,
	subscriptions: false,
	context: ({ req }) => {
		let user = null;
		if (req.headers && req.headers.authorization) {
			const token = req.headers.authorization.split(" ")[1];
			try {
				user = jwt.verify(token, keys.secretKey);
			} catch (e) {}
		}
		return { user };
	},
});

server.applyMiddleware({ app });
// server.start();
app.listen({ port }, async () => {
	// await server.start()
	console.log(
		`Server ready at http://localhost:${port}${server.graphqlPath}`
	);
});
