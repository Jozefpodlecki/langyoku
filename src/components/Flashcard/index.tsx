import React, { useState, useEffect, useRef } from "react"
import Loader from 'react-loader-spinner'
import { animated, useSpring } from 'react-spring'
import { PieChart, Pie, Tooltip, Cell, Legend  } from 'recharts';
import { faSync, faArrowLeft, faArrowRight, faVolumeUp, faTimes, faRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useHistory, Link } from "react-router-dom";
import { getFlashcard } from "api";
import style from './style.scss'
import moment from "moment";
import { parseTries, formatTime, delay } from "utils";


const saveSession = () => Promise.resolve();

const Flashcard = () => {
    const { id: idParam = null} = useParams();
    const id = Number(idParam);
    const [{
        index,
        name,
        checked,
        items,
        startDate,
        endDate,
        audio,
        revealed,
        item,
        contentType,
        style: sectionStyle,
        tries
    }, setState] = useState({
        index: 0,
        name: '',
        right: 0,
        checked: [],
        items: [],
        startDate: null,
        endDate: null,
        audio: null as HTMLAudioElement,
        revealed: false,
        item: {
            id: -1,
            simplified: null,
            traditional: null,
            pinyin: [],
            audioSrc: '',
            meanings: [],
            examples: [],
            breakdown: []
        },
        contentType: 'LOADING',
        style: {
            width: `0px`,
            height: `0px`
        },
        tries: []
    })
    const history = useHistory();
    const contentRef = useRef<HTMLDivElement>(null);
    const [styleProps, set] = useSpring(() => ({
        delay: 0,
        tran: 0,
        config: {
            tension: 0
        }
    }))

    useEffect(() => {
        getFlashcard(id)
            .then(({name, cards: items}) => {
                setState(state => {
                    const index = 0;
                    const item = items[index];
                    const audio = new Audio(item.audioSrc);
                    const startDate = moment().toDate();

                    return {
                        ...state,
                        name,
                        items,
                        audio,
                        item,
                        startDate,
                        contentType: 'CARD_HIDDEN',
                        tries: Array(items.length).fill(0)
                    }
                })
            })
    }, [])

    useEffect(() => {
        if(contentType === 'COMPLETE') {
            saveSession()
                .then(_ => {
                    
                })
        }
    }, [contentType])

    useEffect(() => {
        const element = contentRef && contentRef.current;

        if(element) {
            const { width, height } = element.getBoundingClientRect();
            setState(state => ({
                ...state,
                style: {
                    width: `${width}px`,
                    height: `${height}px`
                }
            }))
        }

    }, [contentRef])

    const onNext = () => {

        setState(state => {
            let { revealed, checked, items, index, item, tries } = state;
            tries = [...tries];
            let newItem = null;
            let audio = null;
            
            console.log(tries);
            tries[item.id -1] = tries[item.id -1] + 1;

            if(revealed) {
                index = (index + 1) % items.length;
                newItem = items[index];
                audio = new Audio(newItem.audioSrc);
            }
            else {
                checked = [...checked, item];
                items = items.filter(pr => pr.id !== item.id);

                if(!items.length) {
                    const endDate = moment().toDate();
                    return {
                        ...state,
                        tries,
                        checked,
                        items,
                        endDate,
                        contentType: 'COMPLETE'
                    }
                }

                const randomIndex = Math.floor(Math.random() * items.length);
                newItem = items[randomIndex];
                audio = new Audio(newItem.audioSrc);
            }

            revealed = false;
            const contentType = 'CARD_HIDDEN';

            return {
                ...state,
                revealed,
                contentType,
                index,
                audio,
                item: newItem,
                checked,
                items,
                tries
            }
        })
    }

    const onQuit = () => {
        history.push('/');
    }
    
    const onFlip = () => {
        set({
            tran: 90
        });

        delay(400)
            .then(_ => {
                setState(state => {
                    return {
                        ...state,
                        revealed: true,
                        contentType: 'CARD_REVEALED'
                    }
                })
            })
            .then(_ => delay(400))
            .then(_ => {
                set({
                    tran: 0
                });
            })
    }

    const playAudio = () => {
        audio.play();
    }

    const onRetry = () => {
        setState(state => {
            const { checked } = state;
            const index = 0;
            const items = [...checked];
            const item = items[index];
            const audio = new Audio(item.audioSrc);
            debugger;
            return {
                ...state,
                index,
                item,
                audio,
                checked: [],
                items: items,
                tries: Array(items.length).fill(0),
                revealed: false,
                contentType: 'CARD_HIDDEN'
            }
        })
    }

    let component = null;

    if(contentType === 'LOADING') {
        component = <Loader
            className={style.loader}
            type="Oval"
            color="#FFF"
            height={100}
            width={100}
        />
    }
    if(contentType === 'CARD_HIDDEN') {
        component = <animated.div style={{
            transform: styleProps.tran.interpolate(pr => `rotateX(${pr}deg)`),
            ...sectionStyle
            }} className={style.section__cardHidden}>
            <div className={style.card__text}>{item.simplified}</div>
            <div className={style.card__speaker} onClick={playAudio}>
                <FontAwesomeIcon icon={faVolumeUp} size="2x"/>
            </div>
        </animated.div>
    }
    if(contentType === 'CARD_REVEALED') {
        component = <animated.div style={{
            transform: styleProps.tran.interpolate(pr => `rotateX(${pr}deg)`),
            ...sectionStyle
            }} className={style.section__cardRevealed}>
            <div className={style.section__left}>
                <div className={style.card__text}>{item.simplified}</div>
                <div>
                    <div>Pinyin</div>
                    <ul className={style.meanings}>
                        {item.pinyin.map((meaning, index) => <li key={index}>{meaning}</li>)}
                    </ul>
                </div>
                <div>
                    <div>Definition</div>
                    <ul className={style.meanings}>
                        {item.meanings.map((meaning, index) => <li key={index}>{meaning}</li>)}
                    </ul>
                </div>
            </div>
            <div className={style.section__right}>
                <div>
                    <ul className={style.section__strokesList}>
                        {item.breakdown.map(pr => <li key={pr.id}>
                            <div>
                                <img className={style.section__strokeImage} src={pr.strokeImage} alt={pr.simplified}/>
                            </div>
                        </li>)}
                    </ul>
                </div>
                <div>
                    <div>Examples</div>
                    <ul className={style.examples}>
                        {item.examples.map((sentence, index) => <li className={style.example} key={index}>
                            <div>{sentence[0]}</div>
                            <div>{sentence[1]}</div>
                            </li>)}
                    </ul>
                </div>
            </div>
            <div className={style.section__cardRevealedspeaker} onClick={playAudio}>
                <FontAwesomeIcon icon={faVolumeUp} size="2x"/>
            </div>
        </animated.div>
    }
    if(contentType === 'COMPLETE') {
        const mostRepeatedWords = tries.map((pr, index) => [pr, checked.find(npr => npr.id === index)])
        .filter(pr => pr[0] > 2);
        const parsedTries = parseTries(tries);

        const computeScore = (tries: any[]) => {
            const result = tries.reduce((acc, value) => {
                return acc + value / (tries.length * value);
            }, 0) * 100;
            return `${result.toFixed(2)}%`;
        }
        const colors = ['#0088FE', '#00C49F', '#FFBB28'];

        const score = computeScore(tries)

        component = <div style={sectionStyle} className={style.section__complete}>
            <div className={style.section__completeHeader}>
                Summary
            </div>
            <div className={style.section__completeContent}>
                <div className={style.section__completeContentScore}>
                    Your score {score}
                </div>
                <div>
                    <PieChart width={400} height={400}>
                        <Pie data={parsedTries} dataKey="value" cx={200} cy={200} innerRadius={0} outerRadius={90} label>
                            {
                                parsedTries.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                            }
                        </Pie>
                        <Tooltip />
                        <Legend height={0}/>
                    </PieChart>
                </div>
                <div>
                    <div>Time spend: {formatTime(startDate, endDate)} </div>
                    {mostRepeatedWords.length ? <>
                        <div>Words you have trouble remembering</div>
                        {mostRepeatedWords.map(pr => 
                                <Link to={`/word/${pr[1]}`} key={pr[1].id}>{pr[1].simplified}</Link>)}
                    </> : null}
                </div>
            </div>
        </div>
    }

    return <div className={style.container}>
        <div className={style.topbar}>
            <div className={style.topbar__appName}>
                Langyoku
            </div>
            <div className={style.topbar__name}>Flashcards - {name}</div>
        </div>
        <div ref={contentRef} className={style.content}>
            {component}
        </div>
        <div className={style.footer}>
            <div className={style.exit} onClick={onQuit}>
                <FontAwesomeIcon icon={faTimes}/>
                <div className={style.exit__text}>Quit</div>
            </div>
            <div className={style.options}>
                <div className={style.option} onClick={onRetry}>
                    <FontAwesomeIcon icon={faSync} />
                    <div className={style.option__text}>Retry</div>
                </div>
                {contentType === 'COMPLETE' ? null : <>
                <div className={`${style.option} ${contentType === 'CARD_REVEALED' ? style['option--disabled'] : null}`} onClick={onFlip}>
                    <FontAwesomeIcon icon={faSync}/>
                    <div className={style.option__text}>Flip</div>
                </div>
                <div className={style.option} onClick={onNext}>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </div>
                </>}
            </div>
            <div className={style.stat}>
                <div className={style.stat__left}>{checked.length + 1}</div>
                <div>/</div>
                <div className={style.stat__right}>{checked.length + items.length}</div>
            </div>
        </div>
    </div>
}



export default Flashcard