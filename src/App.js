import React from 'react';
import './css/App.scss'
import { Switch, Route, Link } from "react-router-dom";
import Lobby from './pages/lobby'
import Presentations from './pages/presentations';
import Scenes from './pages/scenes';
import Spikers from './pages/spikers';
import Members from './pages/members';
import Messages from './pages/messages';
import Exposure from './pages/exposure';
import Conversations from './pages/conversations';
import Party from './pages/party';
import VipAssistent from './pages/vip-assistent';


function App() {
	return (
		<div className="App">

			<Switch>
				{/* Готово/не готово*/}
				<Route exact path="/lobby" component={Lobby} />
				<Route exact path="/presentations" component={Presentations} />
				<Route exact path="/scenes" component={Scenes} />
				<Route exact path="/spikers" component={Spikers} />
				<Route exact path="/members" component={Members} />
				<Route exact path="/messages" component={Messages} />
				<Route exact path="/exposure" component={Exposure} />
				<Route exact path="/conversations" component={Conversations} />
				<Route exact path="/party" component={Party} />
				<Route exact path="/vip-assistent" component={VipAssistent} />

			</Switch>
			<ul>
				<li><Link to="/profile/edit">Регистрация</Link></li>
				<li><Link to="/lobby">Лобби</Link></li>
				<li><Link to="/presentations">Презентации</Link></li>
				<li><Link to="/scenes">Сцены</Link></li>
				<li><Link to="/spikers">Спикеры</Link></li>
				<li><Link to="/members">Участники</Link></li>
				<li><Link to="/messages">Мои сообщения</Link></li>
				<li><Link to="/exposure">экспозона</Link></li>
				<li><Link to="/conversations">Переговорки</Link></li>
				<li><Link to="/party">Вечеринки</Link></li>
				<li><Link to="/vip-assistent">Вип ассистент</Link></li>
			</ul>
		</div>
	);
}

export default App;
