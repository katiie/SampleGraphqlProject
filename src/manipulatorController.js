const {StringBuilder} = require('./util/stringBuilderHelper');
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
    let sb = new StringBuilder();
    for (let i = 0; i < row; i++) {
        let count= row;
        let j=0;
        while(count > 0){
            sb.append(`${data[i][j]}`);
            j++;
            count--;
        }
        sb.append(`\n`);
    }
    return sb.toString();
}

const invert = (data, row) => {
    let sb = new StringBuilder();
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
        sb.append(`${invertRes}\n`);
    }
    return sb.toString();
}

module.exports = {
    sum,
    multiply,
    echo,
    invert
};