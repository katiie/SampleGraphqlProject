const {} = require('jest');
const path = require('path');
const controller = require('./../src/controller/manipulatorController');
const fileReader = require('../src/helper/csvFileReader');
let folderPath = 'testSampleData';

describe('Test for type of matrix', () => {
  it('Valid square matrix', async () => {
    let filePath = path.resolve(__dirname, `${folderPath}/squareMatrix.csv`);
    await fileReader.readFile(filePath).then((data) => {
      expect(data.rowCount).toBeGreaterThan(0)
    });
  });
  it('InValid square matrix', async () => {
    let filePath = path.resolve(__dirname, `${folderPath}/jaggedMatrix.csv`);
    await fileReader.readFile(filePath).catch((data) => {
      expect(data).
      toEqual('Input must be square matrix')
    });
  });

  it('Empty CSV file', async () => {
    let filePath = path.resolve(__dirname, `${folderPath}/emptyFile.csv`);
    await fileReader.readFile(filePath).catch((data) => {
      expect(data).
      toEqual('Input must be square matrix')
    });
  });

  it('Empty txt file', async () => {
    let filePath = path.resolve(__dirname, `${folderPath}/empty.txt`);
    await fileReader.readFile(filePath).catch((data) => {
      expect(data).
      toEqual('Input must be square matrix')
    });
  });
});

describe('Test for matrix manipulation cases', () => {
  test('verify invert', async () => {
    let filePath = path.resolve(__dirname, `${folderPath}/squareMatrix.csv`);
    await fileReader.readFile(filePath).then((data) => {
      let str = controller.invert(data.csvData, data.rowCount);
      expect(str.replace(/\n/g, ' ')).toEqual("1,3 2,4 ")
    });
  });

  test('verify flatten', async () => {
    let filePath = path.resolve(__dirname, `${folderPath}/squareMatrix.csv`);
    await fileReader.readFile(filePath).then((data) => {
      expect(data.csvData.toString()).toEqual("1,2,3,4")
    });
  });

  test('verify sum', async () => {
    let filePath = path.resolve(__dirname, `${folderPath}/squareMatrix.csv`);
    await fileReader.readFile(filePath).then((data) => {
      expect(controller.sum(data.csvData)).toEqual(10)
    });
  });

  test('verify multiplication', async () => {
    let filePath = path.resolve(__dirname, `${folderPath}/squareMatrix.csv`);
    await fileReader.readFile(filePath).then((data) => {
      expect(controller.multiply(data.csvData)).toEqual(24)
    });
  });

  it('verify echo ', async () => {
    let filePath = path.resolve(__dirname, `${folderPath}/squareMatrix.csv`);
    await fileReader.readFile(filePath).then((data) => {
      let str = controller.echo(data.csvData, data.rowCount);
      expect(str.replace(/\n/g, ' ')).toEqual("1,2 3,4 ")
    });
  });

})



describe('File type test', () => {
  test('Test Bad file extension', async () => {
    expect(fileReader.validateFileType('codingChallenge/matrix.jpg')).toEqual(false);
  });

  test('Test Good file extension', async () => {
    expect(fileReader.validateFileType('codingChallenge/matrix.csv')).toEqual(true);
  });
})