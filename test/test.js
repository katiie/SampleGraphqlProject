const {} = require('jest');
const path = require('path');
const controller = require('./../src/manipulatorController');
const fileReader = require('./../src/csvFileReader');
let folderPath = 'testSampleData';

it('Valid that matrix is square', async () => {
  let filePath = path.resolve(__dirname,`${folderPath}/squareMatrix.csv`);
  await fileReader.readFile(filePath).then((data)=> { expect(data.rowCount).toBeGreaterThan(0)});
});

it('verify echo ', async () => {
  let filePath = path.resolve(__dirname,`${folderPath}/squareMatrix.csv`);
  await fileReader.readFile(filePath).then((data)=> { 
    expect(JSON.stringify(controller.echo( data.csvData, data.rowCount))).toEqual
    ("\"12\\n34\\n\"")});
});

test('verify invert', async () => {
  let filePath = path.resolve(__dirname,`${folderPath}/squareMatrix.csv`);
  await fileReader.readFile(filePath).then((data)=> { 
    expect(JSON.stringify(controller.invert( data.csvData, data.rowCount))).toEqual
    ("\"13\\n24\\n\"")});
});

test('verify flatten', async () => {
  let filePath = path.resolve(__dirname,`${folderPath}/squareMatrix.csv`);
  await fileReader.readFile(filePath).then((data)=> { expect(data.csvData.toString()).toEqual("1,2,3,4")});
});

test('verify sum', async () => {
  let filePath = path.resolve(__dirname,`${folderPath}/squareMatrix.csv`);
  await fileReader.readFile(filePath).then((data)=> { expect(controller.sum( data.csvData)).toEqual(10)});
});

test('verify multiplication', async () => {
  let filePath = path.resolve(__dirname,`${folderPath}/squareMatrix.csv`);
  await fileReader.readFile(filePath).then((data)=> { expect(controller.multiply( data.csvData)).toEqual(24)});
});

test('InValid square matrix', async () => {
  let filePath = path.resolve(__dirname,`${folderPath}/jaggedMatrix.csv`);
  await fileReader.readFile(filePath).catch(data => expect(data).toEqual("Number of rows and columns must be equal"));
});

test('Test Bad file extension', async () => {
  expect(fileReader.validateFileType('codingChallenge/matrix.jpg')).toEqual(false);
});

test('Test Good file extension', async () => {
  expect(fileReader.validateFileType('codingChallenge/matrix.csv')).toEqual(true);
}); 