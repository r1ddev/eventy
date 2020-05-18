import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IdeaFirstApiService } from './services';
import { ApiServiceProvider } from './components/api-service-context';
import store from './store';
import { Provider } from 'react-redux';

import Registration from './pages/registration';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Profile from './pages/profile';

const apiService = new IdeaFirstApiService();

ReactDOM.render(
	<Provider store={store}>
		<ApiServiceProvider value={apiService}>
			<Router basename={'/front/app'}>
				<Switch>
					<Route path="/profile/edit" component={Registration} />
					<Route path="/profile" component={Profile} />
					<Route path="/error" component={ErrorPage} />

					<Route path="/" component={App} />
				</Switch>
			</Router>
		</ApiServiceProvider>
	</Provider>
	, document.getElementById('root')
);