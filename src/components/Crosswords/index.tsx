import React, { useState, useEffect } from "react"
import style from './style.scss'
import { getGames } from "api";

const Crosswords = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        getGames()
            .then(games => {
                setStories(games);
            })
    }, [])

    return <div className={style.container}>
        <div className={style.crosswords}>

        </div>
    </div>
}



export default Crosswords