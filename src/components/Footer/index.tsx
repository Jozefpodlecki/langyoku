import React, { useState, useEffect } from "react"
import { getLinks } from "api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from './style.scss'

const Footer = () => {
    const [links, setLinks] = useState([]);
    useEffect(() => {
        getLinks()
            .then(links => {
                setLinks(links);
            })
    }, [])

    return <div className={style.footer}>
    <div className={style.footer__about}>{}</div>
        <div className={style.footer__social}>
            {links.map(pr => <a href={pr.url} key={pr.id} className={style.footer__socialLink}>
                <FontAwesomeIcon icon={pr.icon}/>
            </a>)}
        </div>
    </div>
}

export default Footer