const {
    string
} = require("yargs");

const sum = (data) => {
    let input = [...data.toString()];
    return input.reduce((previousValue, currentValue) => {
        if (!isNaN(currentValue)) {
            return parseInt(previousValue) + parseInt(currentValue);
        } else {
            return previousValue;
        }
    });
};

const multiply = (data) => {
    let input = [...data.toString()];
    return input.reduce((previousValue, currentValue) => {
        if (!isNaN(currentValue)) {
            return parseInt(previousValue) * parseInt(currentValue);
        } else {
            return previousValue;
        }
    });
};


const echo = (data, row) => {
    let res = "";
    console.log(data);
    for (let i = 0; i < row; i++) {
        res += `${data[i].toString()}\r\\\\n`;
    }
    return res;
}

const invert = (data, row) => {
    let res = "";
    for (let i = 0; i < row; i++) {
        let count = row;
        let invertRes = '';
        let j = 0;
        while (count > 0) {
            let rowData = data[j];
            invertRes += `${rowData[i]}`;
            count--;
            j++;
        }
        res += `${invertRes}\n`;
    }
    return res;
}

module.exports = {
    sum,
    multiply,
    echo,
    invert
};