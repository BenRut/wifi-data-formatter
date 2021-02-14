// const fs = require('fs');
const {
	formatPostcode,
	returnExpiryDate,
	getDataByCenter,
	getCentres,
	returnFileName,
	formatDatum,
	filterDataByMonth,
	removeDuplicateEmails,
} = require('./utils');
const Papa = require('papaparse');
const fileName = `test-file-freerunner`;
const filePath = `../public/${fileName}.csv`;
const csv = require('csvtojson');

// const getData = async () => {
// 	const data = await csv().fromFile(filePath);
// 	return data;
// };

const handleSaveToPC = (fileName, jsonArr) => {
	const fileData = Papa.unparse(jsonArr);
	const blob = new Blob([fileData], { type: 'csv' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.download = `${fileName}`;
	link.href = url;
	link.click();
};

// LIM and L&G

const createMultipleFiles = (fileName, data) => {
	// getData().then((data) => {
	const formattedData = data.map((datum) => {
		return formatDatum(datum);
	});
	const filteredByMonth = filterDataByMonth(formattedData);
	const deDuped = removeDuplicateEmails(filteredByMonth);
	const centres = getCentres(data);
	for (let i = 0; i < centres.length; i++) {
		const fileName = returnFileName(centres[i]);
		// fs.writeFile(
		// 	fileName,
		// 	Papa.unparse(
		// 		deDuped.filter((datum) => {
		// 			return datum['Registration Location Name'] === centres[i];
		// 		})
		// 	),
		// 	(err) => {
		// 		if (err) throw err;
		// 		console.log(`${fileName} saved!`);
		// 	}
		// );
	}
	// });
};

// Inkspot/Freerunner/ASI

const createSingleFile = (fileName, data) => {
	// getData().then((data) => {
	const formattedData = data.map((datum) => {
		return formatDatum(datum);
	});
	const filteredByMonth = filterDataByMonth(formattedData);
	const deDupedAndFilteredByMonth = removeDuplicateEmails(filteredByMonth);
	console.log(returnFileName(fileName.substring(0, fileName.length - 4)));

	handleSaveToPC(
		returnFileName(fileName.substring(0, fileName.length - 4)),
		deDupedAndFilteredByMonth
	);
	// fs.writeFile(returnFileName(fileName), Papa.unparse(deDuped), (err) => {
	// 	if (err) throw err;
	// 	console.log(`${returnFileName(fileName)} saved!`);
	// });
	// });
};

module.exports = {
	createMultipleFiles,
	createSingleFile,
};
