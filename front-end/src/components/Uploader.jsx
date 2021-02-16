import React, { Component } from 'react';
import axios from 'axios';
// const { createSingleFile, createMutipleFiles } = require('../write-files');
import { validateInputFormat } from '../utils';
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
		fileNames: [],
		output: 'not-selected',
		files: [],
		filesData: [],
		errorMessage: '',
	};
	onChange = (event) => {
		const fileNames = [];
		for (let i = 0; i < event.target.files.length; i++) {
			fileNames.push(event.target.files[i].name);
		}
		this.setState({
			files: event.target.files,
			fileNames,
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
	// isInputValid = () => {
	// 	for (let i = 0; i < )
	// }
	onSubmit = async (event) => {
		event.preventDefault();
		const filesData = [];
		for (let i = 0; i < this.state.files.length; i++) {
			const res = await this.uploadFile(this.state.files[i]);
			console.log(res.statusText);
			const datum = await this.convertCSVToJson(`./${res.data.filename}`);
			filesData.push(datum);
		}
		this.setState({
			filesData,
		});
		if (this.state.filesData.length === 0) {
			this.setState({
				errorMessage: 'No file to convert',
			});
		} else if (
			validateInputFormat(this.state.filesData[0][0]).isValid === false &&
			validateInputFormat(this.state.filesData[0][0]).dataType ===
				'unrecognised'
		) {
			this.setState({
				errorMessage: 'INVALID FILE: Data in unrecognised format',
			});
		} else if (
			validateInputFormat(this.state.filesData[0][0]).dataType === '1' &&
			this.state.output === 'mutiple-files'
		) {
			this.setState({
				errorMessage: 'INVALID FILE: Wrong provider selected',
			});
		} else if (
			validateInputFormat(this.state.filesData[0][0]).dataType === '2' &&
			this.state.output === 'single-file'
		) {
			this.setState({
				errorMessage: 'INVALID FILE: Wrong Provider Selected',
			});
		} else if (this.state.output === 'not-selected') {
			this.setState({
				errorMessage: 'No Wi-Fi provider selected!',
			});
		} else if (this.state.output === 'single-file') {
			for (let i = 0; i < this.state.fileNames.length; i++) {
				console.log(this.state.fileNames[i]);
				createSingleFile(this.state.fileNames[i], this.state.filesData[i]);
			}
		} else if (this.state.output === 'mutiple-files') {
			for (let i = 0; i < this.state.fileNames.length; i++) {
				createMultipleFiles(this.state.fileNames[i], this.state.filesData[i]);
			}
		}
	};
	onSelect = (event) => {
		this.setState({ output: event.target.value });
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
								multiple
								onChange={this.onChange}
							/>
							<FileInputLabel for="file">Select file</FileInputLabel>
						</FileInputWrapper>
						{this.state.fileNames.map((fileName) => {
							return <p>{fileName}</p>;
						})}
					</FileInputContainer>

					<Select
						value={this.state.output}
						name=""
						id="wifi-provider"
						onChange={this.onSelect}
					>
						<option value="not-selected">Select Wi-Fi provider</option>
						<option value="mutiple-files">BT(LIM)/BT(L&amp;G)</option>
						<option value="single-file">Inkspot/Freerunner/BT(ASI)</option>
					</Select>
					<Button type="submit">
						<span>Format</span>
					</Button>
					{this.state.errorMessage !== '' && (
						<div>{this.state.errorMessage}</div>
					)}
				</Form>
			</UploaderContainer>
		);
	}
}

export default Uploader;
