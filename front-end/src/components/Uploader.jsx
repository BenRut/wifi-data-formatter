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
		fileName: [],
		output: 'not-selected',
		files: null,
		filesData: [],
	};
	onChange = (event) => {
		console.log(event.target.files[0]);
		this.setState({
			files: event.target.files,
			// fileName: event.target.files[0].name,
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
		for (let i = 0; i < this.state.files.length; i++) {
			const res = await this.uploadFile(this.state.files[i]);
			console.log(res.statusText);
			const datum = await this.convertCSVToJson(`./${res.data.filename}`);
			this.setState((currentState) => {
				return {
					filesData: [datum, ...currentState.filesData],
				};
			});
		}

		if (this.state.output === 'not-selected') {
			console.log('No Wi-Fi provider selected!');
		} else if (this.state.output === 'single-file') {
			for (let i = 0; i < this.state.filesData.length; i++) {
				console.log(this.state.files);
				createSingleFile(this.state.files[i].name, this.state.filesData[i]);
			}
		} else if (this.state.output === 'mutiple-files') {
			for (let i = 0; i < this.state.filesData.length; i++) {
				createMultipleFiles(this.state.files[i].name, this.state.filesData[i]);
			}
		}
		this.setState({
			dataInput: '',
			fileName: [],
			files: null,
			filesData: [],
		});
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
						{/* <FileName>{this.state.fileName}</FileName> */}
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
