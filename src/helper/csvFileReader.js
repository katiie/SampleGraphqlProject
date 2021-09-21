const fs = require('fs');
const isSquareMatrix = require('validate.io-square-matrix');
let parse = require('csv-parse');

const readFile = (fileName) => {
    let csvData = [];
    let rowCount = 0;
    return new Promise((resolve, reject) => {
        try {
            fs.createReadStream(fileName)
                .on('error', error => {
                    console.error(error);
                    reject("An error occurred, ensure file is a valid csv file");
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
                        reject("Input must be square matrix");
                    }
                });

        } catch (e) {
            reject("An error occurred, ensure file is a valid csv file");
        }

    })
}

const validateFileType = (name) => {
    return name && name.endsWith('.csv');
}

exports.readFile = readFile;
exports.validateFileType = validateFileType;