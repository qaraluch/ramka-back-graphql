const { gql } = require("apollo-server");

const typeDefs = gql`
  type Media {
    id: ID!
    importedPath: String
    source: String
    fileName: String
  }

  type Query {
    allMedia(pageSize: Int, after: String): MediaPaginated!
  }
  """
  Simple wrapper around our list of media results
  that contains a cursor to the last item in the list.
  Pass this cursor to the launches query to fetch results
  after these.
  """
  type MediaPaginated {
    cursor: String!
    hasMore: Boolean!
    mediaPaginated: [Media]!
  }
`;

module.exports = typeDefs;

//TODO: implement this
// media(id: ID!): Media
