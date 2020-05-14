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
			<p>asdasd</p>
			<Link to="/profile/edit">Registration</Link>
		</div>
	);
}

export default App;
