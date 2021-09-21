const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const app = express();
const { schemeObj} = require('./graphqlModules/schema');
const { root} = require('./graphqlModules/resolver');
const port = process.env.SERVER_PORT || 4000;
const routes = require('./routes/index');

app.use('/graphql',
  graphqlHTTP({
    schema: schemeObj,
    rootValue: root,
    graphiql: true,
  }));

app.get("/", (req, res) => {
  res.send("Welcome");
})

routes.register(app);

app.listen(port);
console.info(`app is listening on port: ${port}`);