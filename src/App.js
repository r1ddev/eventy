import React from "react";
import "./css/App.scss";
import { Switch, Route } from "react-router-dom";

import Presentations from "./pages/presentations";
import Scenes from "./pages/scenes";
import Spikers from "./pages/spikers";
import Messages from "./pages/messages";
import Exposure from "./pages/exposure";
import Conversations from "./pages/conversations";
import Party from "./pages/party";
import VipAssistent from "./pages/vip-assistent";
import Frame from "./components/frame";
import Desk from "./pages/desk/desk";
import Networking from "./pages/networking";
import Quest from "./pages/quest/quest";
import PresentationsList from './pages/presentations-list/index';
import ConversationsRoom from "./pages/conversationsRoom";

function App() {
	return (
		<div className="App">
			<Frame>
				<Switch>
					{/* Готово/не готово*/}
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
					<Route exact path="/party" component={Party} />
					<Route exact path="/quest" component={Quest} />
					<Route exact path="/vip-assistent" component={VipAssistent} />
					<Route exact path="/networking" component={Networking} />
				</Switch>
			</Frame>
		</div>
	);
}

export default App;
