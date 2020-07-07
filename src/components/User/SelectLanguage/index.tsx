import React, { useState } from 'react';
import style from './style.scss'

const SelectLanguage = ({onSelect, onSearch, isLoading, language, languages}) => {
    const [value, setValue] = useState('');
    const [isOpen, setOpen] = useState(false);

    const onChangeValue = ({target: {name, value}}) => {
        //setValue(state => ({...state, [name]: value}))
        setValue(value);
        onSearch(value);
    }

    const onFocus = () => {
        setOpen(true);
    }

    const _onSelect = (language: any) => {
        onSelect(language);
        setOpen(false);
    }

    const onBlur = () => {
        //setOpen(false);
    }

    return <div className="">
        <div>
            <input type="text" className={style.input} value={value} onBlur={onBlur} onFocus={onFocus} onChange={onChangeValue} placeholder="What language would you like to learn?"/>
        </div>
        <div className={`${style.popup} ${isOpen ? style["popup--open"] : ''}`}>
            <div className={`${style.languages}`}>
                {languages.map(pr => <div onClick={() => _onSelect(pr)} className={`${style.language}`} key={pr.id}>
                    <div className={style.languageFlag} style={{background: `url(${pr.url}) center center / cover no-repeat`}}></div>
                    <div className={style.languageName}>{pr.name}</div>
                </div>)}
            </div>
            
        </div>
    </div>
}

export default SelectLanguage;