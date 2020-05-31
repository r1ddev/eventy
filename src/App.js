import React from "react";
import "./css/App.scss";
import { Switch, Route, Redirect } from "react-router-dom";


import Presentations from "./pages/presentations";
import Scenes from "./pages/scenes";
import Spikers from "./pages/spikers";
import Messages from "./pages/messages";
import Exposure from "./pages/exposure";
import Conversations from "./pages/conversations";
import VipAssistent from "./pages/vip-assistent";
import Frame from "./components/frame";
import Desk from "./pages/desk/desk";
import Networking from "./pages/networking";
import Quest from "./pages/quest/quest";
import PresentationsList from './pages/presentations-list/index';
import ConversationsRoom from "./pages/conversationsRoom";
import { connect } from 'react-redux';
import { compose } from './utils';
import api from './js/api';
import { setUserData } from './actions/user-actions';

class App extends React.Component {

	componentDidMount() {
		if (window.localStorage.token !== undefined) {
			if (this.props.user.data === undefined) {
				api.account.getUserData().then(res => {
					this.props.setUser(res.user)
				}).catch(e => console.log(e))
			}
		} else {
			this.props.history.push("/error")
		}
	}

	render() {
		return (
			<div className="App">
				<Frame>
					<Switch>
						{/* Готово/не готово*/}
						<Route exact path="/" component={Desk} />
						<Route exact path="/desk" component={Desk} />
						<Route exact path="/presentations" component={Presentations} />
						<Route exact path="/presentations/:folder" component={PresentationsList} />
						<Route exact path="/scenes" component={Scenes} />
						<Route exact path="/spikers" component={Spikers} />
						<Route exact path="/messages" component={Messages} />
						<Route exact path="/messages/:id" component={Messages} />
						<Route exact path="/exposure" component={Exposure} />
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

const mapDispatchToProps = (dispatch, { }) => {
	return {
		setUser: (userData) => setUserData(userData, dispatch),
	}
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
