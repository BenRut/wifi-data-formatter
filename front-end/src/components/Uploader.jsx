import React, { Component } from 'react';
import axios from 'axios';
// const { createSingleFile, createMutipleFiles } = require('../write-files');
import { createSingleFile, createMultipleFiles } from '../write-files';
const csv = require('csvtojson');

class Uploader extends Component {
	state = {
		dataInput: '',
		filePath: '',
		input: 'mutiple-files',
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
	uploadFile = async (file) => {
		const formData = new FormData();
		formData.append('file', file);
		return await axios.post('http://localhost:8000/upload', formData, {});
	};
	onSubmit = async (event) => {
		event.preventDefault();
		const res = await this.uploadFile(this.state.file);
		console.log(res);
		console.log(res.statusText);
		const data = await this.convertCSVToJson(`./${res.data.filename}`);
		this.setState({
			csvJsonArr: data,
		});
		if (this.state.input === 'single-file') {
			createSingleFile(this.state.file.name, data);
		} else if (this.state.input === 'mutiple-files') {
			createMultipleFiles(this.state.file.name, data);
		}
	};
	onSelect = (event) => {
		this.setState({ input: event.target.value });
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
					<select name="" id="wifi-provider" onChange={this.onSelect}>
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
