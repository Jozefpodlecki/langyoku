import React, { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import SelectLanguage from "components/User/SelectLanguage"
import AccountMenu from "components/User/AccountMenu"
import style from './style.scss'
import { appName } from "constant"
import { getLanguages, saveProfile, getProfile } from "api"
import { useProfile } from "ProfileContext"

const Navbar = () => {
    const [canEdit, setEdit] = useState(false);
    const editRef = useRef<HTMLDivElement>(null);
    const [isLoading, setLoading] = useState(true);
    const [languages, setLanguages] = useState([]);
    const [profile, setProfile] = useProfile()
    
    useEffect(() => {
        
        getLanguages({
            name: '',
            pageSize: 9
        })
            .then(languages => {
                setLanguages(languages);
                setLoading(false);
            })
    }, [])

    const onSearch = (name) => {
        setLoading(true);
        getLanguages({
            name,
            pageSize: 9
        })
            .then(languages => {
                setLanguages(languages);
                setLoading(false);
            })
    }

    const onSelect = (language: any) => {
        saveProfile({language})
            .then(pr => {
                setProfile(profile => ({
                    ...profile,
                    language
                }));
                setEdit(false);
            })
    }

    const onEdit = () => {
        setEdit(true);
        const handleOutsideClick = (event: MouseEvent) => {
            const element = editRef && editRef.current;
            
            if(element && !element.contains(event.target as Node)) {
                setEdit(false);
                document.removeEventListener("mousedown", handleOutsideClick);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
    }

    const { language } = profile;

    return <div className={style.navbar}>
        <div className={style.navbarLogo}>{appName}</div>
        <div ref={editRef}>
            {profile && language.id && !canEdit ? <div className={style.navbarLearnStatus} onClick={onEdit}>
                <div className={style.navbarLearnStatusText}>Currently learning {language.name}</div>
                <img className={style.navbarLearnStatusFlag} src={language.url} alt={language.name}/>
                <div>
                    <FontAwesomeIcon icon={faEdit}/>
                </div>
            </div> : 
            <SelectLanguage isLoading={isLoading} onSelect={onSelect} onSearch={onSearch} language={language} languages={languages} />}
        </div>
        <AccountMenu/>
    </div>
}


export default Navbar