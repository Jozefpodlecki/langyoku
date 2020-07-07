import React from "react"
import style from './style.scss'

const ProgressBar = ({value}) => {
    return <div className={style.barShadow}>
        <div style={{width: `${value}%`}} className={style.bar}></div>
    </div>
}

export default ProgressBar;