import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import PublicCafe from './components/PublicCafe';
import Welcome from './components/Welcome';

function App() {
	return (
		<Router>
			<div className="app">
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
				</Switch>
			</div>
		</Router>
	);
}

export default App;
