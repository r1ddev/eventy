import React from 'react';
import './css/App.scss'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src="" className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
        </p>
				<Link to="/dashboard">Dashboard</Link>
			</header>
		</div>
	);
}

export default App;
