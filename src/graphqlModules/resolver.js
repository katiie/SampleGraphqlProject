const fileReader = require('./../csvFileReader');
const controller = require('./../manipulatorController');

const root = {
    echo: async (args) => {
        let filePath = args.file;
        let isValid = fileReader.validateFileType(filePath);
        let response = "";
        if (isValid) {
            await fileReader.readFile(filePath).then((data) => {
                response = controller.echo(data.csvData, data.rowCount);
            }).catch((err) => {
                console.error(err);
                response = err;
            });
        } else {
            response = "CSV file type is required";
        }
        return (response);
    },
    invert: async (args) => {
        let filePath = args.file;
        let isValid = fileReader.validateFileType(filePath);
        let response = "";
        if (isValid) {
            await fileReader.readFile(filePath).then((data) => {
                response = controller.invert(data.csvData, data.rowCount);
            }).catch((err) => {
                console.error(err);
                response = "Invalid file type";
            });
        } else {
            response = "CSV file type is required";
        }
        return response;
    },
    flatten: async (args) => {
        let filePath = args.file;
        let isValid = fileReader.validateFileType(filePath);
        let response = "";
        if (isValid) {
            await fileReader.readFile(filePath).then((data) => {
                response = data.csvData.toString();
            }).catch((err) => {
                console.error(err);
                response = "Invalid file type";
            });
        } else {
            response = "CSV file type is required";
        }
        return response;
    },
    sum: async (args) => {
        let filePath = args.file;
        let isValid = fileReader.validateFileType(filePath);
        let response = "";
        if (isValid) {
            await fileReader.readFile(filePath).then((data) => {
                response = controller.sum(data.csvData);
            }).catch((err) => {
                console.error(err);
                response = "Invalid file type";
            });
        } else {
            response = "CSV file type is required";
        }
        return response;
    },
    multiply: async (args) => {
        let filePath = args.file;
        let isValid = fileReader.validateFileType(filePath);
        let response = "";
        if (isValid) {
            await fileReader.readFile(filePath).then((data) => {
                response = controller.multiply(data.csvData);
            }).catch((err) => {
                console.error(err);
                response = "Invalid file type";
            });
        } else {
            response = "CSV file type is required";
        }
        return response;
    }
};
exports.root = root;