const fileReader = require('./../helper/csvFileReader');
const controller = require('./../controller/manipulatorController');

const root = {
    echo: async (args) => {
        let filePath = args.file;
        let response = "";
        await fileReader.readFile(filePath).then((data) => {
            response = controller.echo(data.csvData, data.rowCount);
        }).catch((err) => {
            console.error(err);
            response = err;
        });
        return (response);
    },
    invert: async (args) => {
        let filePath = args.file;
        let response = "";
        await fileReader.readFile(filePath).then((data) => {
            response = controller.invert(data.csvData, data.rowCount);
        }).catch((err) => {
            console.error(err);
            response = err;
        });
        return response;
    },
    flatten: async (args) => {
        let filePath = args.file;
        let response = "";
        await fileReader.readFile(filePath).then((data) => {
            response = data.csvData.toString();
        }).catch((err) => {
            console.error(err);
            response = err;
        });
        return response;
    },
    sum: async (args) => {
        let filePath = args.file;
        let response = "";
        await fileReader.readFile(filePath).then((data) => {
            response = controller.sum(data.csvData);
        }).catch((err) => {
            console.error(err);
            response = err;
        });

        return response;
    },
    multiply: async (args) => {
        let filePath = args.file;
        let response = "";
        await fileReader.readFile(filePath).then((data) => {
            response = controller.multiply(data.csvData);
        }).catch((err) => {
            console.error(err);
            response = err;
        });

        return response;
    }
};
exports.root = root;