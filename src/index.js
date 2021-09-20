const express = require('express');
const {
  graphqlHTTP
} = require('express-graphql');
const {
  buildSchema
} = require('graphql')
const app = express();
//const {schema} = require('./graphqlModules/schema');
const {root} = require('./graphqlModules/resolver');
const cors = require('cors');

app.use(cors());
const port = process.env.SERVER_PORT || 4000; 

let schema = buildSchema(`
  type Query {
    echo(filePath: String!): String
    invert(filePath: String!): String
    flatten(filePath: String!): String
    sum(filePath: String!): String
    multiply(filePath: String!): String
  }
`);
app.use('/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

app.get("/", (req, res) => {
  res.send("Welcome");
})
app.listen(port);
console.log(`app is listening on port: ${port}`);