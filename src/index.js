const express = require('express');
const {
  graphqlHTTP
} = require('express-graphql');
const app = express();
const {schemeObj} = require('./graphqlModules/schema');
const {
  root
} = require('./graphqlModules/resolver');
const cors = require('cors');

app.use(cors());
const port = process.env.SERVER_PORT || 4000;

app.use('/graphql',
  graphqlHTTP({
    schema: schemeObj,
    rootValue: root,
    graphiql: true,
  }));

app.get("/", (req, res) => {
  res.send("Welcome");
})

//returns matrix string format as text/json
app.get("/echo", (req, res) => {
  res.set('content-type', 'text/json');
  root.echo({file: req.query.file}).then((data)=>{
    res.send(data)
  })
})

//returns matrix string format as text/json
app.get("/invert", (req, res) => {
  res.set('content-type', 'text/json');
  root.invert({file: req.query.file}).then((data)=>{
    res.send(data)
  })
})


app.listen(port);
console.info(`app is listening on port: ${port}`);