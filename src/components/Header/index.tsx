import React, {  } from "react"
import { Link } from "react-router-dom";
import { appName } from "constant";
import style from './style.scss'

const Header = () => {
    return <div className={style.header}>
        <div className={style.headerTitle}>
            <Link to="/">{appName}</Link>
        </div>
    </div>
}

export default Header