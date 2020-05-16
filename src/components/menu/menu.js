import React from 'react';
import { Link } from "react-router-dom";
import "./menu.css"

class Menu extends React.Component {

    state = {
        itemsCount: 12
    }

    render() {
        return (
            <div id="menu">
                <MenuItem icon="lobby" label="Лобби" link="/lobby"></MenuItem>
                <MenuItem icon="scenes" label="Сцены" link="/scenes"></MenuItem>
                <MenuItem icon="program" label="Программа" link="/"></MenuItem>
                <MenuItem icon="spikers" label="Спикеры" link="/spikers"></MenuItem>
                <MenuItem icon="presentations" label="Презентации" link="/presentations"></MenuItem>
                <MenuItem icon="lobby" label="Лобби" link="/lobby"></MenuItem>
                <MenuItem icon="lobby" label="Лобби" link="/lobby"></MenuItem>
                <MenuItem icon="lobby" label="Лобби" link="/lobby"></MenuItem>
                <MenuItem icon="lobby" label="Лобби" link="/lobby"></MenuItem>
                <MenuItem icon="lobby" label="Лобби" link="/lobby"></MenuItem>
                <MenuItem icon="lobby" label="Лобби" link="/lobby"></MenuItem>
                {/* <ul>
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
                </ul> */}

            </div>
        )
    }
}



class MenuItem extends React.Component {
    render() {

        const { label, link, icon } = this.props

        return (
            <div className="menu-item">
                <Link to={link}>
                    <img alt="" className="menu-item-icon" />
                    <div className="menu-item-label" ><p>{label}</p></div>
                </Link>
            </div>
        )
    }
}



export default Menu;
