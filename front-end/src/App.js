import logo from './bw-logo-dark.svg';
import asterix from './asterisk-purple.svg';
import './App.css';
import Uploader from './components/Uploader';
import { Logo, LogoContainer, LogoWrapper, Title } from './styles';

function App() {
	return (
		<div className="App">
			<LogoContainer>
				<LogoWrapper>
					<Logo src={logo} alt={'Bewonder'} />
				</LogoWrapper>
			</LogoContainer>
			<Title>Wifi Data Formatter</Title>

			<Uploader />
		</div>
	);
}

export default App;
