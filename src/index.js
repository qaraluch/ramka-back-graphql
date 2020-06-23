const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");

const dbSource = require("./datasources/dbSource");
const resolvers = require("./resolvers");

//TODO: add to config.js
const optionsDefault = {
  // ramkaHomeDir: "/mnt/h/ramka",
  // mediaRepoDir: "data/images",
  dbName: "../.DB-ramka",
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    dbSource: new dbSource({ dbName: optionsDefault.dbName }),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
