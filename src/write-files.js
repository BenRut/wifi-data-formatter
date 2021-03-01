const {
	getCentres,
	getDataByCentre,
	returnFileName,
	formatDatum,
	filterDataByMonth,
	removeDuplicateEmails,
} = require('./utils');
const Papa = require('papaparse');

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

const createMultipleFiles = (data) => {
	const formattedData = data.map((datum) => {
		return formatDatum(datum);
	});

	const deDuped = removeDuplicateEmails(formattedData);
	const fileName = returnFileName(deDuped[0]['registration location name']);

	handleSaveToPC(fileName, deDuped);
};

const createASIFiles = (data) => {
	const formattedData = data.map((datum) => {
		return formatDatum(datum);
	});

	const deDuped = removeDuplicateEmails(formattedData);
	const fileName = returnFileName(deDuped[0]['location name']);

	handleSaveToPC(fileName, deDuped);
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
	createASIFiles,
};
