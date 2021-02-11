import React, { Component } from 'react';
import axios from 'axios';

class Uploader extends Component {
	state = {
		dataInput: '',
		filePath: '',
		wifiProvider: '',
		file: null,
	};
	onChange = (event) => {
		this.setState({
			file: event.target.files[0],
			loaded: 0,
		});
	};
	onSubmit = (event) => {
		event.preventDefault();
		this.uploadFile(this.state.file).then((response) => {
			console.log(response.statusText);
		});
	};
	uploadFile = (file) => {
		const formData = new FormData();
		formData.append('file', file);
		return axios.post('http://localhost:8000/upload', formData, {});
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
