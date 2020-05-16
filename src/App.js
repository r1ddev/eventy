import React from "react";
import "./css/App.scss";
import { Switch, Route } from "react-router-dom";
import Lobby from "./pages/lobby";
import Presentations from "./pages/presentations";
import Scenes from "./pages/scenes";
import Spikers from "./pages/spikers";
import Members from "./pages/members";
import Messages from "./pages/messages";
import Exposure from "./pages/exposure";
import Conversations from "./pages/conversations";
import Party from "./pages/party";
import VipAssistent from "./pages/vip-assistent";
import Frame from "./components/frame";

function App() {
	return (
		<div className="App">
			<Frame>
				<Switch>
					{/* Готово/не готово*/}
					<Route exact path="/lobby" component={Lobby} />
					<Route
						exact
						path="/presentations"
						component={Presentations}
					/>
					<Route exact path="/scenes" component={Scenes} />
					<Route exact path="/spikers" component={Spikers} />
					<Route exact path="/members" component={Members} />
					<Route exact path="/messages" component={Messages} />
					<Route exact path="/exposure" component={Exposure} />
					<Route
						exact
						path="/conversations"
						component={Conversations}
					/>
					<Route exact path="/party" component={Party} />
					<Route
						exact
						path="/vip-assistent"
						component={VipAssistent}
					/>
				</Switch>
			</Frame>
		</div>
	);
}

export default App;
