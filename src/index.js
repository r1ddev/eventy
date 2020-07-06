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
import Error from './pages/error';
import Login from './pages/login';
import Registration from './pages/registration';
import RegistrationAcception from './pages/registration-acception';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordRecovery from './pages/password-recovery';

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
							<Route path="/login" component={Login} />
							<Route path="/registration" component={Registration} />
							<Route path="/registration-acception" component={RegistrationAcception} />
							<Route path="/password-recovery" component={PasswordRecovery} />



							<Route path="/error" component={Error} />
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
