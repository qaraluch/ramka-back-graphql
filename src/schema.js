const { gql } = require('apollo-server');

type Media {
  id: ID!
  importedPath: String
  source: String
  fileName: String
}

const typeDefs = gql`
  # Your schema will go here
`;

module.exports = typeDefs;
