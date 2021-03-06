import styled, { keyframes } from 'styled-components';
import asterisk from '../asterisk-purple.svg';

const AppContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

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
	cursor: pointer;
	background: linear-gradient(225deg, #ffffff, #f2f2f2);
	/* background: #f2f2f2; */
	display: block;
	border-radius: 30px;
	/* border: solid 0.25px #b0b0b0; */
	border: none;
	font-size: 11px;
	letter-spacing: 1.4px;
	text-transform: uppercase;
	padding: 12px 20px 12px 20px;
	max-height: 50px;
	color: #9164cc;
	max-width: 340px;
	overflow: hidden;
	transition: all 0.2s;
	border-radius: 50px;

	&:hover {
		/* background: #9164cc;
		color: #fff; */
		background: none;
		box-shadow: inset -1px 1px 3px #bebebe, inset 1px -1px 3px #f2f2f2;
	}
`;

const ButtonWrapper = styled.div`
	margin: 10px;
	cursor: pointer;

	/* border: solid 2px #9164cc; */
	border: none;

	color: #9164cc;

	overflow: hidden;
	transition: all 0.2s;
	border-radius: 50px;
	box-shadow: -3px 3px 5px #b0b0b0, 3px -3px 5px #ffffff;
`;

const InnerButtonWrapper = styled.div`
	padding: 5px;
	background-image: linear-gradient(
		to left bottom,
		#ededed,
		#f1f1f1,
		#f6f6f6,
		#fafafa,
		#ffffff
	);
`;

const Form = styled.form`
	display: flex;
	flex-direction: row;
`;

const FileInput = styled.input`
	opacity: 0;
	width: 0.1px;
	height: 0.1px;
	position: absolute;
`;

const FileInputWrapper = styled.div`
	/* cursor: pointer;
	display: block;
	border-radius: 30px;
	background: none;
	border: solid 2px #9164cc;
	font-size: 11px;
	letter-spacing: 1.4px;
	padding: 12px 20px 12px 20px;
	color: #9164cc;
	text-transform: uppercase;

	transition: all 0.2s;
	&:hover {
		background: #9164cc;
		color: #fff;
	} */
	cursor: pointer;

	/* background: #f2f2f2; */
	display: block;
	border-radius: 30px;
	/* border: solid 2px #9164cc; */
	border: none;
	font-size: 11px;
	letter-spacing: 1.4px;
	text-transform: uppercase;
	padding: 12px 20px 12px 20px;
	max-height: 50px;
	color: #9164cc;
	max-width: 340px;
	overflow: hidden;
	transition: all 0.2s;
	border-radius: 50px;
	background: linear-gradient(225deg, #ffffff, #f2f2f2);
	&:hover {
		/* background: #9164cc;
		color: #fff; */
		background: none;
		box-shadow: inset -1px 1px 3px #bebebe, inset 1px -1px 3px #f2f2f2;
	}

	/* box-shadow: -3px 3px 5px #b0b0b0, 3px -3px 5px #ffffff; */

	&:hover {
		/* background: #9164cc;
		color: #fff; */
		/* box-shadow: inset -5px 5px 10px #d9d9d9, inset 6px 0px 10px #ffffff; */
		background: #ffffff;
	}
`;

const UploaderContainer = styled.div`
	/* box-shadow: -1px 0px 43px -16px rgba(0, 0, 0, 0.88);
	-webkit-box-shadow: -1px 0px 43px -16px rgba(0, 0, 0, 0.88);
	-moz-box-shadow: -1px 0px 43px -16px rgba(0, 0, 0, 0.88); */
	border-radius: 20px;
	height: 430px;
	width: 600px;
	margin: 25px;
	display: flex;
	flex-direction: column;
	border-radius: 18px;
	border-radius: 18px;

	/* border-radius: 77px; */
	background: #f2f2f2;

	/* box-shadow: inset -5px 5px 10px #b0b0b0, inset 5px -5px 10px #ffffff; */

	box-shadow: -5px 5px 10px #b0b0b0, 5px -5px 10px #ffffff;
`;

const UploaderHeader = styled.div`
	border-radius: 20px 20px 0 0;
	width: 100%;
	height: 100px;
	/* background: #f2f2f2; */
	align-self: flex-start;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const UploaderFooter = styled.div`
	/* box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.88); */
	/* position: absolute;
	bottom: 0; */
	border-radius: 0 0 18px 18px;
	width: 600px;
	height: 105px;
	background: #9164cc;
	align-self: flex-end;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const FileInputLabel = styled.label`
	cursor: pointer;
`;

// const Select = styled.select`
// 	height: 50px;
// 	margin: 10px;
// 	padding: 12px 20px 12px 20px;
// `;

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
	flex-direction: column;
	margin: 10px;
`;

const Title = styled.h1`
	color: #9164cc;
`;

const ErrorMessage = styled.div`
	min-width: 500px;
	max-width: 500px;
	font-style: italic;
	color: #fff;
	font-weight: 700;
`;

const FileList = styled.div`
	width: 100%;
	height: 225px;
	overflow-y: scroll;
	/* position: relative; */
	&:before {
		top: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
		content: '';
		width: 100%;
		height: 8px;
		position: absolute;
		left: 0;
	}
	&:after {
		bottom: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
		content: '';
		width: 100%;
		height: 8px;
		position: absolute;
		left: 0;
	}
`;

const FileListContainer = styled.div`
	/* width: 100%;
	height: 225px; */
	position: relative;
	/* &:before {
		content: '';
		width: 600px;
		height: 225px;
		top: 0;
		left: 0;
		position: absolute;
		z-index: 10;
		-moz-box-shadow: inset 0 8px 8px -8px #696868, inset 0 -8px 8px -8px #696868;
		-webkit-box-shadow: inset 0 8px 8px -8px #696868,
			inset 0 -8px 8px -8px #696868;
		box-shadow: inset 0 8px 8px -8px #696868, inset 0 -8px 8px -8px #696868;
	} */
`;

const FileCard = styled.div`
	height: 100px;
	width: 596px;
	/* background: #fff; */
	/* border-top: solid 1px #b0b0b0; */
	/* border-bottom: solid 1px #b0b0b0; */
	display: flex;
	align-items: center;
	margin: 5px 2px 5px 2px;
	border-radius: 10px;
	box-shadow: -3px 3px 5px #b0b0b0, 3px -3px 5px #ffffff;
`;

const Thumbnail = styled.div`
	background: #ddd;
	color: white;
	min-height: 70px;
	min-width: 70px;
	font-weight: 700;
	font-size: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 30px 0 15px;
`;

const Shadow = styled.div`
	position: absolute;
`;

const SelectWrapper = styled.div`
	position: relative;
	display: inline-block;
	width: 250px;
`;

const SelectCover = styled.div`
	width: 100%;
	height: 100%;
	z-index: 1;
	background: none;
`;

const Select = styled.select`
	transition: all 0.2s;
	padding: 12px 20px 12px 20px;
	z-index: 1;
	font-size: 11px;
	font-family: 'Arial';
	display: inline-block;
	width: 250px;
	cursor: pointer;
	outline: 0;
	/* border: 2px solid #9164cc; */
	border: none;
	border-radius: 30px;
	/* background: ${(props) => (props.hover ? '#9164cc' : '#ffffff')}; */
	background: #f2f2f2;
	color: #9164cc;
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	&::-ms-expand {
		display: none;
	}
	&:hover {
		/* color: #ffffff; */
		box-shadow: inset -5px 5px 10px #d9d9d9, inset 6px 0px 10px #ffffff;
	}
	/* &:focus {
		color: #ffffff;
		background: #9164cc;
	} */
	&:disabled {
		opacity: 0.5;
		pointer-events: none;
	}
	box-shadow: inset -3px 3px 7px #d9d9d9, inset 3px -3px 7px #ffffff;
`;
const SelectArrow = styled.div`
	z-index: 0;
	position: absolute;
	top: 0.9em;
	right: 1em;
	width: 0px;
	height: 0px;
	border: solid #9164cc;
	border-width: 0 3px 3px 0;
	display: inline-block;
	padding: 3px;
	transform: rotate(45deg);
	-webkit-transform: rotate(45deg);
	/* border-color: ${(props) => (props.hover ? '#ffffff' : '#9164cc')}; */
	&:hover {
		/* border-color: #9164cc; */
	}
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
	SelectArrow,
	SelectWrapper,
	SelectCover,
	FileName,
	FileInputContainer,
	Title,
	ErrorMessage,
	AppContainer,
	UploaderHeader,
	UploaderFooter,
	FileList,
	FileCard,
	Thumbnail,
	FileListContainer,
	ButtonWrapper,
	InnerButtonWrapper,
};
