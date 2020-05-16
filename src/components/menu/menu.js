import React from 'react';
import { Link } from "react-router-dom";
import "./menu.css"
class Menu extends React.Component {

    render() {
        return (
            <div id="menu">
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
        )
    }
}



export default Menu;
