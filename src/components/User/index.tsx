import React, { useState, useEffect } from "react"
import style from './style.scss'
import { Route, Switch } from "react-router-dom"
import { getMenuItems } from "api"
import SideMenu from "./SideMenu"
import Navbar from "./Navbar"

const Authorized = () => {
    const [menuItems, setMenuItems] = useState([]);
    
    useEffect(() => {

        getMenuItems()
            .then(menuItems => {
                setMenuItems(menuItems);
            })
    }, [])

    return <div className={style.container}>
        <Navbar/>
        <div className={style.wrapper}>
            <SideMenu menuItems={menuItems}/>
            <div className={style.content}>
                <Switch>
                    {menuItems.map(menuItem => <Route key={menuItem.id} path={menuItem.link} component={menuItem.component}/>)}
                </Switch>
            </div>
        </div>
    </div>
}



export default Authorized