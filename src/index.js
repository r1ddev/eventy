import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { IdeaFirstApiService } from './services';
import { ApiServiceProvider } from './components/api-service-context';

import store from './store';
import { Provider } from 'react-redux';

import Registration from './Registration';

ReactDOM.render(
	// <React.StrictMode>
	<Router basename={'/front/app'}>
		<Switch>
			<Route exact path="/">
				<App />
			</Route>
			<Route path="/profile/edit">
				<Registration />
			</Route>
		</Switch>
	</Router>,
	// </React.StrictMode>,
	document.getElementById('root')
);