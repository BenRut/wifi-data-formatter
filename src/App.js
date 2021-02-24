import logo from './bw-logo-dark.svg';
import './App.css';
import Uploader from './components/Uploader';
import {
	Logo,
	LogoContainer,
	LogoWrapper,
	Title,
	AppContainer,
} from './styles';

function App() {
	return (
		<div>
			<LogoContainer>
				<LogoWrapper>
					<Logo src={logo} alt={'Bewonder'} />
				</LogoWrapper>
			</LogoContainer>
			<AppContainer className="App">
				<Title>Wifi Data Formatter</Title>

				<Uploader />
			</AppContainer>
		</div>
	);
}

export default App;
