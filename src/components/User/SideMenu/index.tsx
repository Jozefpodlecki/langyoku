import React, { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, Route, Switch } from "react-router-dom"
import style from './style.scss'

const SideMenu = ({menuItems}) => {
    
    return <div className={style.sidebar}>
        {menuItems.map(menuItem => <Link key={menuItem.id} className={style.menuItem} to={menuItem.link}>
            <FontAwesomeIcon icon={menuItem.icon}/>
            <div className={style.menuItem__text}>{menuItem.name}</div>
        </Link>)}
    </div>
}



export default SideMenu