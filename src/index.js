import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Registration from './Registration';

ReactDOM.render(
	// <React.StrictMode>
		<Router>
			<Switch>
				<Route exact path="/">
					<App />
				</Route>
				<Route path="/about">
					<App />
				</Route>
				<Route path="/dashboard">
					<Registration />
				</Route>
			</Switch>
		</Router>,
	// </React.StrictMode>,
	document.getElementById('root')
);