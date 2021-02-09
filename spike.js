// const data = require("./test-data/test-file-asi.csv");
// const csv = require('csv-parser');
// const results = [];

// fs.createReadStream('data.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     console.log(results);
//   });
const fs = require('fs');
const {
    formatPostcode,
    returnExpiryDate,
    getDataByCenter,
    getCentres,
    returnFileName
} = require("./utils");
const Papa = require('papaparse')

// let data;
const filePath = './test-data/test-file-l-and-g.csv';
const csv = require('csvtojson');
const getData = async () => {
    const data = await csv().fromFile(filePath);
    return data;   
};


getData().then(data => {
    const formattedData = data.map(datum => {
        datum['Sign Up Source'] = "Wifi";
        datum['Postcode'] = formatPostcode( datum['Postcode']);
        if (datum['Week Ending']) {
            datum['Expiry Date'] = returnExpiryDate(datum['Week Ending']);
        };
        if (!datum['Week Ending']) {
            datum['Expiry Date'] = returnExpiryDate();
        }
        return datum;
    })
    const centres = getCentres(data);
    for (let i = 0; i < centres.length; i++) {
        const fileName = returnFileName(centres[i]);
        fs.writeFile(fileName, Papa.unparse(formattedData.filter((datum) => {
            return datum['Registration Location Name'] === centres[i];
        })), (err) => {
            if (err) throw err;
            console.log(`${fileName} saved!`);
        });
    }
});









// csv()
// .fromFile(filePath)
// .then((data)=>{
//    data.map(datum => {
//         datum['Postcode'] = formatPostcode(datum['Postcode']);
//         console.log(datum);
//     });
// });

// constdata = await csv()
// .fromFile(filePath);

// const formattedPostcodes = data.map(datum => {
//     console.log(datum);
// });


