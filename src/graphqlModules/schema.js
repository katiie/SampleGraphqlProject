const {
    buildSchema
} = require('graphql')
const schema = buildSchema(`
type Query {
  echo(file: String!): String
  invert(file: String!): String
  flatten(file: String!): String
  sum(file: String!): String
  multiply(file: String!): String
}
`);
exports.schemeObj = schema;