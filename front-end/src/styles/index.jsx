import styled, { keyframes } from 'styled-components';
import asterisk from '../asterisk-purple.svg';

const Logo = styled.img`
	display: block;
	width: 146px;
	height: 22px;
	position: relative;
`;

const SpinAnimation = keyframes`
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
`;

const LogoWrapper = styled.div`
	width: 146px;
	height: 22px;
	display: block;
	position: relative;
	z-index: 2;
	&:after {
		content: '';
		z-index: 3;
		display: block;
		width: 13px;
		height: 13px;
		position: absolute;
		top: -0.5px;
		right: -0.5px;
		background: url(${asterisk}) no-repeat center;
		-webkit-animation: spin 2s infinite both linear;
		animation: ${SpinAnimation} 2s infinite both linear;
	}
`;

const LogoContainer = styled.div`
	padding: 50px;
`;

const ButtonText = styled.span`
	 cursor: pointer;
   display: inline-block;
   position: relative;
   transition: 0.4s;
	&:after {
		content: '\00bb';
   position: absolute;
   opacity: 0;
   top: 0;
   right: -20px;
   transition: 0.5s;
	}
`;

const Button = styled.button`
	margin: 10px;
	display: block;
	background: none;
	border: solid 2px #9164cc;
	font-size: 14px;
	letter-spacing: 1.4px;
	padding: 12px 20px 12px 20px;
	color: #9164cc;
	width: -webkit-max-content;
	width: -moz-max-content;
	width: max-content;
	max-width: 340px;
	text-transform: uppercase;
	overflow: hidden;
	transition: all 0.2s;

	&:hover {
		background: #9164cc;
		color: white;
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const FileInput = styled.input`
	opacity: 0;
	width: 0.1px;
	height: 0.1px;
	position: absolute;
`;

const FileInputWrapper = styled.div`
	display: block;
	background: none;
	border: solid 2px #9164cc;
	font-size: 14px;
	letter-spacing: 1.4px;
	padding: 12px 20px 12px 20px;
	color: #9164cc;
	width: -webkit-max-content;
	width: -moz-max-content;
	width: max-content;
	max-width: 340px;
	text-transform: uppercase;
	overflow: hidden;
	transition: all 0.2s;
	&:hover {
		background: #9164cc;
		color: white;
	}
`;

const UploaderContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const FileInputLabel = styled.label``;

const Select = styled.select`
	margin: 10px;
	padding: 12px 20px 12px 20px;
`;

const FileName = styled.div`
	min-width: 200px;
	max-width: 200px;
	display: flex;
	align-items: center;
	justify-content: left;
	font-size: 9px;
	padding-left: 10px;
	-webkit-box-shadow: inset 0px 0px 7px 1px rgba(0, 0, 0, 0.27);
	-moz-box-shadow: inset 0px 0px 7px 1px rgba(0, 0, 0, 0.27);
	box-shadow: inset 0px 0px 7px 1px rgba(0, 0, 0, 0.27);
	overflow-x: hidden;
`;

const FileInputContainer = styled.div`
	display: flex;
	margin: 10px;
`;

const Title = styled.h1`
	color: #9164cc;
`;

export {
	Logo,
	LogoWrapper,
	LogoContainer,
	Button,
	Form,
	FileInput,
	FileInputLabel,
	FileInputWrapper,
	UploaderContainer,
	Select,
	FileName,
	FileInputContainer,
	Title,
};
