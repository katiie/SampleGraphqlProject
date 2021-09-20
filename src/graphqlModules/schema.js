const {
    buildSchema
} = require('graphql')
const schema = buildSchema(`
type Query {
  echo(filePath: String!): String
  invert(filePath: String!): String
  flatten(filePath: String!): String
  sum(filePath: String!): String
  multiply(filePath: String!): String
}
`);
exports.scheme = schema;