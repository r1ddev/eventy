import React from "react";
import "./css/App.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import Presentations from "./pages/presentations";
import Scenes from "./pages/scenes";
import Messages from "./pages/messages";
import Exposure from "./pages/exposure";
import exposureLanding from "./pages/exposure-landing/exposure-landing";
import Conversations from "./pages/conversations";
import VipAssistent from "./pages/vip-assistent";
import Frame from "./components/frame";
import Desk from "./pages/desk/desk";
import Networking from "./pages/networking";
import Quest from "./pages/quest/quest";
import PresentationsList from './pages/presentations-list/index';
import ConversationsRoom from "./pages/conversations-room";
import { connect } from 'react-redux';
import { compose } from './utils';
import api from './js/api';
import withApiService from './components/hoc/with-api-service'
import { setUserData } from './actions/user-actions';

class App extends React.Component {

	componentDidMount() {
		if (window.localStorage.token !== undefined) {
			if (this.props.user.data === undefined) {
				api.account.getUserData().then(res => {
					this.props.setUser(res)
				}).catch(e => console.log(e))
			}
		} else {
			this.props.history.push("/login")
		}
	}

	componentWillMount() {
		const { history } = this.props;
		this.unsubscribeFromHistory = history.listen(() => this.handleLocationChange(window.location.href));
		this.handleLocationChange(window.location.href);

		if (window.location.protocol == "https:") {
			// window.location.href = "http://" + host + pathname
		}

		let timeZoneOffset = new Date().getTimezoneOffset() / -60
		api.account.updateUserData({ timezone: timeZoneOffset })
	}

	componentWillUnmount() {
		if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
	}

	handleLocationChange = (location) => {
		// console.log(location)
		this.props.postUrl(location)

	}


	render() {
		return (
			<div className="App">
				<Frame>
					<Switch>
						<Route exact path="/" component={Desk} />
						<Route exact path="/desk" component={Desk} />
						<Route exact path="/presentations" component={Presentations} />
						<Route exact path="/presentations/:folder" component={PresentationsList} />
						<Route exact path="/scenes" component={Scenes} />
						<Route exact path="/messages" component={Messages} />
						<Route exact path="/messages/:id" component={Messages} />
						<Route exact path="/exposure" component={Exposure} />
						<Route exact path="/exposure/:id" component={exposureLanding} />
						<Route exact path="/conversations" component={Conversations} />
						<Route exact path="/conversations/:room" component={ConversationsRoom} />
						<Route exact path="/quest" component={Quest} />
						<Route exact path="/vip-assistent" component={VipAssistent} />
						<Route exact path="/networking" component={Networking} />
						<Redirect to="/error" />
					</Switch>
				</Frame>
			</div>
		);
	}
}

const mapStateToProps = ({ user }) => {
	return {
		user
	}
};

const mapDispatchToProps = (dispatch, { apiService }) => {
	return {
		setUser: (userData) => setUserData(userData, dispatch),
		postUrl: (url) => apiService.postUrl(url)
	}
};


export default compose(
	withApiService(),
	connect(mapStateToProps, mapDispatchToProps))(App);