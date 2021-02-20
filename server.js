const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

app.use(cors());

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './front-end/public/uploads');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

app.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).send(req.file);
	});
});

app.delete('/:file_name', (req, res) => {
	const fileName = req.params['file_name'];
	const path = `./front-end/public/uploads/${fileName}`;
	try {
		fs.unlinkSync(path);
		//file removed
	} catch (err) {
		console.error(err);
	}
});

const upload = multer({ storage }).single('file');

app.listen(8000, function () {
	console.log('App running on port 8000');
});
