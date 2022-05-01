const { rule} = require("graphql-shield");

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

module.exports = { isAuthenticated };
