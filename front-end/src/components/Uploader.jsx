import React, { Component } from 'react';
import axios from 'axios';
// const { createSingleFile, createMutipleFiles } = require('../write-files');
import { createSingleFile, createMultipleFiles } from '../write-files';
import {
	Button,
	Form,
	FileInput,
	FileInputWrapper,
	FileInputLabel,
	UploaderContainer,
	Select,
	FileName,
	FileInputContainer,
} from '../styles';
const csv = require('csvtojson');

class Uploader extends Component {
	state = {
		dataInput: '',
		fileName: '',
		input: 'mutiple-files',
		file: null,
		csvJsonArr: [],
	};
	onChange = (event) => {
		this.setState({
			file: event.target.files[0],
			fileName: event.target.files[0].name,
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
		if (this.state.output === 'not-selected') {
			console.log('No Wi-Fi provider selected!');
		} else if (this.state.input === 'single-file') {
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
			<UploaderContainer>
				<Form onSubmit={this.onSubmit} action="">
					<FileInputContainer>
						<FileInputWrapper>
							<FileInput
								type="file"
								id="file"
								name="file"
								accept=".csv"
								onChange={this.onChange}
							/>
							<FileInputLabel for="file">Select file</FileInputLabel>
						</FileInputWrapper>
						<FileName>{this.state.fileName}</FileName>
					</FileInputContainer>

					<Select name="" id="wifi-provider" onChange={this.onSelect}>
						<option value="not-selected">Select Wi-Fi provider</option>
						<option value="mutiple-files">BT(LIM)/BT(L&amp;G)</option>
						<option value="single-file">Inkspot/Freerunner/BT(ASI)</option>
					</Select>
					<Button type="submit">
						<span>Format</span>
					</Button>
				</Form>
			</UploaderContainer>
		);
	}
}

export default Uploader;
