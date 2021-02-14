import React, { Component } from 'react';
import axios from 'axios';
// const { createSingleFile, createMutipleFiles } = require('../write-files');
import { createSingleFile, createMultipleFiles } from '../write-files';
const csv = require('csvtojson');

class Uploader extends Component {
	state = {
		dataInput: '',
		filePath: '',
		wifiProvider: '',
		file: null,
		csvJsonArr: [],
	};
	onChange = (event) => {
		this.setState({
			file: event.target.files[0],
			loaded: 0,
		});
	};
	convertCSVToJson = async (filePath) => {
		const res = await axios.get(filePath);
		const CSVString = res.data;
		const jsonArr = await csv().fromString(CSVString);
		return jsonArr;
	};
	uploadFile = (file) => {
		const formData = new FormData();
		formData.append('file', file);
		return axios.post('http://localhost:8000/upload', formData, {});
	};
	onSubmit = async (event) => {
		event.preventDefault();
		const res = await this.uploadFile(this.state.file);
		console.log(res.statusText);
		const data = await this.convertCSVToJson(`./${this.state.file.name}`);
		this.setState({
			csvJsonArr: data,
		});
		createSingleFile(data);
	};

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit} action="">
					<label htmlFor="file">Upload file:</label>
					<input
						type="file"
						id="file"
						name="file"
						accept=".csv"
						onChange={this.onChange}
					/>
					<label htmlFor="wifi-provider">Wifi provider:</label>
					<select name="" id="wifi-provider">
						<option value="mutiple-files">BT(LIM)/BT(L&amp;G)</option>
						<option value="single-file">Inkspot/Freerunner/BT(ASI)</option>
					</select>
					<button type="submit">Format</button>
				</form>
			</div>
		);
	}
}

export default Uploader;
