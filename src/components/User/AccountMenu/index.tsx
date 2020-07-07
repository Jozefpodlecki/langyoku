import React, { useState } from "react";
import style from './style.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const onClick = () => {
        setOpenMenu(state => !state);
    }

    const onSignOut = () => {

    }

    return <div>
        <img onClick={onClick} className={`${style.avatar}`} src={require('assets/avatar.jpg').default} alt="avatar"/>
        <div className={`${style.menu} ${openMenu ? style["menu--opened"] : ''}`}>
            <div className={style.menu__item}>
                <FontAwesomeIcon icon={faCog}/>
                <div>Settings</div>
            </div>
            <div className={style.menu__item} onClick={onSignOut}>
                <FontAwesomeIcon icon={faSignOutAlt}/>
                <div>Sign out</div>
            </div>
        </div>
    </div>
}

export default Menu;