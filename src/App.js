import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import PublicCafe from './components/PublicCafe';
import Welcome from './components/Welcome';
import CafeDetails from './components/CafeDetails';
import Table from './components/Table';
import ProfileInfo from './components/ProfileInfo';
import NotFound from './components/NotFound';
import { UserProvider } from './composables/UserContext';

const THEME = createMuiTheme({
	typography: {
		fontFamily: 'Montserrat',
		fontSize: 14,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 600,
		fontWeighBold: 600
	}
});
function App() {
	return (
		<ThemeProvider theme={THEME}>
			<UserProvider>
				<Router>
					<div className="App">
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route path="/welcome">
								<Welcome />
							</Route>
							<Route path="/login">
								<Login />
							</Route>
							<Route path="/signup">
								<Signup />
							</Route>
							<Route path="/profile">
								<Profile />
							</Route>
							<Route path="/public-cafe">
								<PublicCafe />
							</Route>
							<Route path="/cafe-details/:id">
								<CafeDetails />
							</Route>
							<Route path="/tables/:id">
								<Table />
							</Route>
							<Route path="/profile-info">
								<ProfileInfo />
							</Route>
							<Route path="*" component={NotFound} />
						</Switch>
					</div>
				</Router>
			</UserProvider>
		</ThemeProvider>
	);
}

export default App;
