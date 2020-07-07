import React, { useState, useEffect } from "react"
import style from './style.scss'
import { getGames } from "api";
import { Link } from "react-router-dom";

const Games = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        getGames()
            .then(games => {
                setGames(games);
            })
    }, [])

    return <div className={style.container}>
        {games.map(pr => <Link key={pr.id} to={pr.link} className={style.game}>
            {pr.name}
        </Link>)}
    </div>
}



export default Games