const fs = require('fs')
const isSquareMatrix = require('validate.io-square-matrix');
let parse = require('csv-parse');

const readFile = (fileName) => {
    let csvData = [];
    let rowCount = 0;
    return new Promise((resolve, reject) => {
        fs.createReadStream(fileName)
            .on('error', error => {
                reject("An error occurred, ensure path is a valid csv file");
            })
            .pipe(parse({
                delimiter: ':'
            }))
            .on('data', function (rowData) {
                let rowDataArr = rowData[0].split(',');
                csvData.push(rowDataArr);
                rowCount++;
            })
            .on('end', function () {
                if (isSquareMatrix(csvData)) {
                    resolve({
                        rowCount,
                        csvData
                    });
                } else {
                    reject("Number of rows and columns must be equal");
                }
            });
    })
}

const validateFileType = (name) => {
    if (name && name.endsWith('.csv')) {
        return true;
    }
    return false;
}

exports.readFile = readFile;
exports.validateFileType = validateFileType;