const { root} = require('../graphqlModules/resolver');
const express = require("express");
const appRouter = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({})
const upload = multer({
    storage: storage,
    fileFilter:  (req, file, callback) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            return callback(new Error('Only CSV file').message)
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024
    }
})

appRouter.use(upload.single('file'),function (req, res, next) {
    if (!req.file || !req.file.path) {
        const error = new Error('Please upload a csv file');
        error.httpStatusCode = 400;
        res.send(error.message);
    } else{
        next();
    }
});


appRouter.post("/echo", (req, res) => {
    let tempPath = req.file.path;
    root.echo({
        file: tempPath
    }).then((data) => {
        res.send(data);
    })
});

appRouter.post("/invert", (req, res) => {
    let tempPath = req.file.path;
    root.invert({
        file: tempPath
    }).then((data) => {
        res.send(data);
    })
});

appRouter.post("/flatten", (req, res) => {
    let tempPath = req.file.path;
    root.flatten({
        file: tempPath
    }).then((data) => {
        res.send(data);
    })
});

appRouter.post("/sum", (req, res) => {
    let tempPath = req.file.path;
    root.sum({
        file: tempPath
    }).then((data) => {
        res.send(data.toString());
    })
});

appRouter.post("/multiply", (req, res) => {
    let tempPath = req.file.path;
    root.multiply({
        file: tempPath
    }).then((data) => {
        res.send(data.toString());
    })
});

exports.register = (app) => {
    app.use(appRouter);
};