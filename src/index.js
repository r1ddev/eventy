import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IdeaFirstApiService } from './services';
import { ApiServiceProvider } from './components/api-service-context';
import store from './store';
import { Provider } from 'react-redux';

import EditProfile from './pages/edit-profile';
import Profile from './pages/profile';
import ErrorPage from './pages/error';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiService = new IdeaFirstApiService();



class Index extends React.Component {


	render() {
		return (
			<Provider store={store}>
				<ApiServiceProvider value={apiService}>
					<ToastContainer />
					<Router>
						<Switch>
							<Route path="/profile/edit" component={EditProfile} />
							<Route path="/profile/:id" component={Profile} />
							<Route path="/profile" component={Profile} />
							<Route path="/error" component={ErrorPage} />

							<Route path="/" component={App} />

						</Switch>
					</Router>

				</ApiServiceProvider>
			</Provider>
		)
	}
}


ReactDOM.render(
	<Index />

	, document.getElementById('root')
);
