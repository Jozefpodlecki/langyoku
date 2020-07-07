import React, { useState, useEffect, useRef } from "react"
import style from './style.scss'

const defaultSize = {
    width: `100vw`,
    height: `100vh`
}

const FlagsBackground = ({size = defaultSize, flags}) => {

    return <div style={size} className={style.background}>
        {flags.map(({id, flag, url}) => <div key={id} data-flag={flag} className={style.flag} style={{backgroundImage: `url(${url})`}}></div>)}
    </div>
}



export default FlagsBackground