import logo from './bw-logo-dark.svg';
import asterix from './asterisk-purple.svg';
import './App.css';
import Uploader from './components/Uploader';
import { Logo, LogoContainer, LogoWrapper } from './styles';

function App() {
	return (
		<div className="App">
			<LogoContainer>
				<LogoWrapper>
					<Logo src={logo} alt={'Bewonder'} />
				</LogoWrapper>
			</LogoContainer>
			<h1>Wifi Data Formatter</h1>

			<Uploader />
		</div>
	);
}

export default App;
