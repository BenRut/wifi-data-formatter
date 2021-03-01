import React, { Component } from 'react';
import {
	validateInputFormat,
	sortDataIntoFiles,
	sortASIDataIntoFiles,
} from '../utils';
import {
	createSingleFile,
	createMultipleFiles,
	createASIFiles,
} from '../write-files';
import {
	Button,
	Form,
	FileInput,
	FileInputWrapper,
	FileInputLabel,
	UploaderContainer,
	Select,
	SelectArrow,
	SelectWrapper,
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
		selectIsHovered: false,
	};
	onChange = (event) => {
		const fileNames = [];
		const filesData = [];
		for (let i = 0; i < event.target.files.length; i++) {
			fileNames.push(event.target.files[i].name);
			const reader = new FileReader();
			reader.readAsText(event.target.files[i]);
			reader.onload = async (e) => {
				const fileData = await this.convertCSVToJson(reader.result);
				filesData.push(fileData);
			};
		}
		this.setState({
			files: event.target.files,
			fileNames,
			errorMessage: '',
			filesData,
		});
	};
	toggleSelectHover = (e) => {
		this.setState({ selectIsHovered: !this.state.selectIsHovered });
	};
	convertCSVToJson = async (str) => {
		const jsonArr = await csv().fromString(str);
		return jsonArr;
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
		const validatedInput = await this.isInputValid();

		if (validatedInput === true && this.state.output === '1') {
			for (let i = 0; i < this.state.fileNames.length; i++) {
				createSingleFile(this.state.fileNames[i], this.state.filesData[i]);
			}
		} else if (validatedInput === true && this.state.output === '2') {
			const sortedData = sortDataIntoFiles(this.state.filesData);
			for (let i = 0; i < sortedData.length; i++) {
				createMultipleFiles(sortedData[i]);
			}
		} else if (validatedInput === true && this.state.output === '3') {
			const sortedData = sortASIDataIntoFiles(this.state.filesData);
			for (let i = 0; i < sortedData.length; i++) {
				createASIFiles(sortedData[i]);
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
								<FileInputLabel htmlFor="file">Select file(s)</FileInputLabel>
							</FileInputWrapper>
						</FileInputContainer>
						<SelectWrapper>
							<Select
								value={this.state.output}
								name=""
								id="wifi-provider"
								onChange={this.onSelect}
								onMouseEnter={this.toggleSelectHover}
								onMouseLeave={this.toggleSelectHover}
								hover={this.state.selectIsHovered}
							>
								<option value="0">Select Wi-Fi provider</option>
								<option value="1">Inkspot/Freerunner</option>
								<option value="2">BT(LIM)/BT(L&amp;G)</option>
								<option value="3">BT(ASI)</option>
							</Select>
							<SelectArrow hover={this.state.selectIsHovered}></SelectArrow>
						</SelectWrapper>

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
