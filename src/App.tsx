import dpsLogo from './assets/DPS.svg';
import './App.css';
import UserList from './components/user-list/UserList';

// https://dummyjson.com/users

function App() {
	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<UserList />
			</div>
		</>
	);
}

export default App;
