import React, { Component } from 'react';
import axios from 'axios';
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
	FileInputContainer,
	ErrorMessage,
	UploaderHeader,
	UploaderFooter,
	FileList,
	FileCard,
	Thumbnail,
	FileListContainer,
} from '../styles';
const csv = require('csvtojson');

class Uploader extends Component {
	state = {
		fileNames: [],
		output: '0',
		files: [],
		filesData: [],
		errorMessage: '',
		uploadedFileNames: [],
	};
	onChange = (event) => {
		const fileNames = [];
		for (let i = 0; i < event.target.files.length; i++) {
			fileNames.push(event.target.files[i].name);
		}
		this.setState({
			files: event.target.files,
			fileNames,
			errorMessage: '',
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
	deleteFile = async (fileName) => {
		const res = await axios.delete(`http://localhost:8000/${fileName}`);
	};
	isInputValid = async () => {
		let count = 0;
		if (this.state.filesData.length === 0) {
			this.setState({
				errorMessage: 'No file to convert',
			});
			return false;
		}
		if (this.state.output === '0') {
			this.setState({
				errorMessage: 'No Wi-Fi provider selected!',
			});
			return false;
		}
		for (let i = 0; i < this.state.filesData.length; i++) {
			count++;
			if (
				validateInputFormat(this.state.filesData[i][0]).dataType ===
				'unrecognised'
			) {
				this.setState({
					errorMessage: 'INVALID FILE: Data in unrecognised format',
				});
				return false;
			} else if (
				validateInputFormat(this.state.filesData[i][0]).dataType !==
				this.state.output
			) {
				this.setState({
					errorMessage: 'INVALID FILE: Wrong provider selected',
				});
				return false;
			} else if (count === this.state.filesData.length) {
				this.setState({
					errorMessage: '',
				});
				return true;
			}
		}
	};
	onSubmit = async (event) => {
		event.preventDefault();
		const filesData = [];
		const uploadedFileNames = [];
		for (let i = 0; i < this.state.files.length; i++) {
			const res = await this.uploadFile(this.state.files[i]);
			console.log(res.statusText);
			uploadedFileNames.push(res.data.filename);
			const datum = await this.convertCSVToJson(
				`./uploads/${res.data.filename}`
			);
			filesData.push(datum);
		}
		this.setState({
			filesData,
			uploadedFileNames,
		});
		const validatedInput = await this.isInputValid();

		if (validatedInput === true && this.state.output === '1') {
			for (let i = 0; i < this.state.fileNames.length; i++) {
				createSingleFile(this.state.fileNames[i], this.state.filesData[i]);
				this.deleteFile(this.state.uploadedFileNames[i]);
			}
		} else if (validatedInput === true && this.state.output === '2') {
			for (let i = 0; i < this.state.fileNames.length; i++) {
				createMultipleFiles(this.state.fileNames[i], this.state.filesData[i]);
				this.deleteFile(this.state.uploadedFileNames[i]);
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
					<UploaderHeader>
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
								<FileInputLabel for="file">Select file(s)</FileInputLabel>
							</FileInputWrapper>
						</FileInputContainer>
						<Select
							value={this.state.output}
							name=""
							id="wifi-provider"
							onChange={this.onSelect}
						>
							<option value="0">Select Wi-Fi provider</option>
							<option value="1">Inkspot/Freerunner/BT(ASI)</option>
							<option value="2">BT(LIM)/BT(L&amp;G)</option>
						</Select>
						<Button type="submit">
							<span>Format</span>
						</Button>
					</UploaderHeader>
				</Form>
				<FileListContainer>
					<FileList>
						{this.state.fileNames.map((fileName) => {
							return (
								<FileCard>
									<Thumbnail>.CSV</Thumbnail>
									{fileName}
								</FileCard>
							);
						})}
					</FileList>
				</FileListContainer>

				<UploaderFooter>
					{this.state.errorMessage !== '' && (
						<ErrorMessage>{this.state.errorMessage}</ErrorMessage>
					)}
				</UploaderFooter>
			</UploaderContainer>
		);
	}
}

export default Uploader;
