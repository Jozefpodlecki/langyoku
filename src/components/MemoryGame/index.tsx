import React, { useState, useEffect } from "react"
import { getMatches } from "../../api";
import style from './style.scss'
import ProgressBar from "components/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import {useSpring, animated} from 'react-spring'
import { match } from "assert";
import { Z_FILTERED } from "zlib";

const TextMatch = ({id, checked, selected, value, onClick}) => {
    const length = value.length;
    const computedFontSize = length > 2 ? '50px' : '100px';
    const props = useSpring({opacity: checked ? 1 : 0})
    
    return <div onClick={() => onClick(id)} className={`${style.textWrapper} ${selected ? style[`textWrapper--selected`] : ''} ${checked ? style[`textWrapper--checked`] : ''}`}>
        <animated.div className={`${style.text}  ${checked ? style[`text--hidden`] : ''}`} style={{fontSize: computedFontSize}}>{value}</animated.div>
        <animated.div style={props} className={style.checkIcon}>
            <FontAwesomeIcon icon={faCheck} size="4x"/>
        </animated.div>
    </div>
}

const ImageMatch = ({id, checked, selected, value, onClick}) => {
    const props = useSpring({opacity: checked ? 1 : 0})

    return <div onClick={() => onClick(id)}>
            <img className={style.image} src={value} alt={value}/>
            <animated.div style={props} className={style.textChecked}>
                <FontAwesomeIcon icon={faCheck} size="4x"/>
            </animated.div>
        </div>
}

const MemoryGame = () => {
    const [matches, setMatches] = useState([]);
    const [value, setValue] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {

        getMatches({language: 'chinese'})
            .then(matches => {
                matches = matches.map(match => ({
                    ...match,
                    checked: false,
                    selected: false
                }))
                setMatches(matches);
            })

    }, []);

    useEffect(() => {
        const selected = matches.filter(pr => pr.selected);
        
        if(selected.length === 2) {

            setTimeout(() => {
                setMatches(matches => {
                    matches = [...matches];
                    const selected = matches.filter(pr => pr.selected);
                    const [first, second] = selected;

                    if(first.matchId === second.matchId) {
                        first.checked = true;
                        second.checked = true;
                        setValue(value => value + (2 / matches.length) * 100);
                    }
        
                    first.selected = false;
                    second.selected = false;

                    return matches;
                })
            }, 500);
        }
    }, [matches])
    

    const onClick = (id: number) => {
        setMatches(matches => {
            matches = [...matches];
            const match = matches.find(pr => pr.id === id);
            match.selected = true;

            return matches
        })
    }

    const onQuit = () => {
        
    }

    const renderCell = (match: any) => {

        if(match.type === "text") {
            return <TextMatch id={match.id} checked={match.checked} selected={match.selected} onClick={onClick} key={match.id} value={match.value}/>
        }

        return <ImageMatch id={match.id} checked={match.checked} selected={match.selected} onClick={onClick} key={match.id} value={match.value}/>
    }

    const computeGrid = () => {
        return {
            width: `900px`,
            gridTemplateColumns: `repeat(3, 1fr)`,
            gridTemplateRows: `repeat(3, 200px)`
        }
    }

    return <div className={style.container}>
    <div className={style.header}>
        <div>Score {score}</div>
    </div>
    <div className={style.game}>
        <div style={computeGrid()} className={style.grid}>
            {matches.map(renderCell)}
        </div>
    </div>
    <div>
        <div className={style.exit}>
            <ProgressBar value={value}/>
        </div>
        <div>
            <div className={style.exit} onClick={onQuit}>
                <FontAwesomeIcon icon={faTimes}/>
                <div className={style.exit__text}>Quit</div>
            </div>
        </div>
    </div>
</div>
}



export default MemoryGame