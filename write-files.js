const fs = require('fs');
const {
    formatPostcode,
    returnExpiryDate,
    getDataByCenter,
    getCentres,
    returnFileName,
    formatDatum
} = require("./utils");
const Papa = require('papaparse')
const fileName = `test-file-l-and-g`
const filePath = `./test-data/${fileName}.csv`;
const csv = require('csvtojson');
const getData = async () => {
    const data = await csv().fromFile(filePath);
    return data;   
};

// LIM and L&G

getData().then(data => {
    const formattedData = data.map(datum => {
      return formatDatum(datum);
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

// Inkspot/Freerunner/ASI

// getData().then(data => {
//     const formattedData = data.map(datum => {
//       return formatDatum(datum);
//     })
//         fs.writeFile(returnFileName(fileName), Papa.unparse(formattedData), (err) => {
//             if (err) throw err;
//             console.log(`${fileName} saved!`);
//         });
// });