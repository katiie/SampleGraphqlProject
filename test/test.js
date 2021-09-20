const {} = require('jest');
const path = require('path');
const controller = require('./../src/manipulatorController');
const fileReader = require('./../src/csvFileReader');
let folderpath = 'testSampleData';

test('Valid square matrix', async () => {
  let filePath = path.resolve(__dirname,`${folderpath}/squareMatrix.csv`);
  await fileReader.readFile(filePath).then((data)=> { expect(data.rowCount).toBeGreaterThan(0)});
});

test('Flatten matrix', async () => {
  let filePath = path.resolve(__dirname,`${folderpath}/squareMatrix.csv`);
  await fileReader.readFile(filePath).then((data)=> { expect(data.csvData.toString()).toEqual("1,2,3,4")});
});

test('Sum matrix', async () => {
  let filePath = path.resolve(__dirname,`${folderpath}/squareMatrix.csv`);
  await fileReader.readFile(filePath).then((data)=> { expect(controller.sum( data.csvData)).toEqual(10)});
});

test('Multiplication Test', async () => {
  let filePath = path.resolve(__dirname,`${folderpath}/squareMatrix.csv`);
  await fileReader.readFile(filePath).then((data)=> { expect(controller.multiply( data.csvData)).toEqual(24)});
});

test('InValid square matrix', async () => {
  let filePath = path.resolve(__dirname,`${folderpath}/jaggedMatrix.csv`);
  await fileReader.readFile(filePath).catch(data => expect(data).toEqual("Number of rows and columns must be equal"));
});

test('Test Bad file extension', async () => {
  expect(fileReader.validateFileType('codingChallenge/matrix.jpg')).toEqual(false);
});

test('Test Good file extension', async () => {
  expect(fileReader.validateFileType('codingChallenge/matrix.csv')).toEqual(true);
}); 