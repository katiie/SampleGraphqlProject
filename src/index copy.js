const express = require('express');
const bodyParser = require('body-parser');
const {
  graphqlHTTP
} = require('express-graphql');
const {
  graphql,
  buildSchema
} = require('graphql')
const graphqlUploadExpress = require('graphql-upload/public/graphqlUploadExpress.js');
const app = express();
const csv = require('csv-parser')
const fs = require('fs')
const readline = require('readline');
const csvreader = require('./csvFileReader');
const controller = require('./manipulatorController');

var parse = require('csv-parse');

var cors = require('cors');
const matrixController = require('./manipulatorController');

app.use(cors());

let schema = buildSchema(`
  type Query {
    echo(filePath: String!): String
    invert(filePath: String!): String
    flatten(filePath: String!): String
    sum(filePath: String!): String
    multiply(filePath: String!): String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  echo: async (args) => {
    let filePath = args.filePath;
    let isValid = csvreader.validateFileType(filePath);
    let response ;
    if (isValid) {
      await csvreader.readFile(filePath).then((data) => {
        response =[1,2,3].toString();
        response +='/r/n';
        response +=[1,2,3].toString();
      }).catch((err) => {
        response= err;
      });
    } else {
      response = "CSV file type is required";
    }
    return response;
  },
  invert: async (args) => {
    let filePath = args.filePath;
    let isValid = csvreader.validateFileType(filePath);
    let response = "";
    if (isValid) {
      await csvreader.readFile(filePath).then((data) => {
        response = matrixController.invert(data.csvData, data.rowCount);
      }).catch((err) => {
        console.error(err)
        response = "Invalid file type";
      });
    } else {
      response = "CSV file type is required";
    }
    return response;
  },
  flatten: async (args) => {
    let filePath = args.filePath;
    let isValid = csvreader.validateFileType(filePath);
    let response = "";
    if (isValid) {
      await csvreader.readFile(filePath).then((data) => {
        response = data.csvData.toString();
      }).catch((err) => {
        console.error(err)
        response = "Invalid file type";
      });
    } else {
      response = "CSV file type is required";
    }
    return response;
  },
  sum: async (args) => {
    let filePath = args.filePath;
    let isValid = csvreader.validateFileType(filePath);
    let response = "";
    if (isValid) {
      await csvreader.readFile(filePath).then((data) => {
        response = matrixController.sum(data.csvData);
      }).catch((err) => {
        console.error(err)
        response = "Invalid file type";
      });
    } else {
      response = "CSV file type is required";
    }
    return response;
  },
  multiply: async (args) => {
    let filePath = args.filePath;
    let isValid = csvreader.validateFileType(filePath);
    let response = "";
    if (isValid) {
      await csvreader.readFile(filePath).then((data) => {
        response = matrixController.multiply(data.csvData);
      }).catch((err) => {
        console.error(err)
        response = "Invalid file type";
      });
    } else {
      response = "CSV file type is required";
    }
    return response;
  }
};

app.use('/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

app.get("/", (req, res, next) => {
  res.send("Welcome");
})
app.listen("3400");