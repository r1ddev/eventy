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
import Profile from './pages/profile';
import ErrorPage from './pages/error';

const apiService = new IdeaFirstApiService();

ReactDOM.render(
	<Provider store={store}>
		<ApiServiceProvider value={apiService}>
			<Router basename={'/front/app'}>
				<Switch>
					<Route path="/profile/edit" component={Registration} />
					<Route path="/profile/:id" component={Profile} />
					<Route path="/profile" component={Profile} />
					<Route path="/error" component={ErrorPage} />

					<Route path="/" component={App} />
				</Switch>
			</Router>
		</ApiServiceProvider>
	</Provider>
	, document.getElementById('root')
);