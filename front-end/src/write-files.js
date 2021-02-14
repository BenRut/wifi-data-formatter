const {
	getCentres,
	returnFileName,
	formatDatum,
	filterDataByMonth,
	removeDuplicateEmails,
} = require('./utils');
const Papa = require('papaparse');

// const csv = require('csvtojson');
// const fileName = `test-file-freerunner`;
// const filePath = `../public/${fileName}.csv`;
// const fs = require('fs');

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
	const deDupedAndFilteredByMonth = removeDuplicateEmails(filteredByMonth);
	const centres = getCentres(data);
	for (let i = 0; i < centres.length; i++) {
		fileName = returnFileName(centres[i]);

		handleSaveToPC(fileName, deDupedAndFilteredByMonth);
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
	const formattedData = data.map((datum) => {
		return formatDatum(datum);
	});
	const filteredByMonth = filterDataByMonth(formattedData);
	const deDupedAndFilteredByMonth = removeDuplicateEmails(filteredByMonth);

	handleSaveToPC(
		returnFileName(fileName.substring(0, fileName.length - 4)),
		deDupedAndFilteredByMonth
	);
};

module.exports = {
	createMultipleFiles,
	createSingleFile,
};
