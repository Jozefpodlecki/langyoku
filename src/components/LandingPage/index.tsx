import React, { useState, useEffect, useRef } from "react"
import { Link } from 'react-router-dom'
import style from './style.scss'
import { getFlags } from "data/flags";
import { appName, appDescription } from "constant";
import FlagsBackground from "components/FlagsBackground";

const LandingPage = () => {

    const contentRef = useRef<HTMLDivElement>(null);
    const [flagsState, setFlags] = useState({
        allFlags: [],
        flags: []
    });
    const [size, setSize] = useState({
        width: '',
        height: ''
    });

    useEffect(() => {
        const element = contentRef && contentRef.current;

        if(element) {
            const { width, height } = element.getBoundingClientRect();
            setSize({
                width: `${width}px`,
                height: `${height}px`
            })
        }
    }, [contentRef]);

    useEffect(() => {        

        getFlags()
            .then(flags => {
                setFlags(state => ({
                    ...state,
                    allFlags: flags,
                    flags: flags.slice(0, 25)
                }))
            })

    }, [])

    const randomizeFlags = (isMounted) => {
        if(!isMounted) {
            return;
        }

        setFlags(state => {

            const { flags, allFlags } = state;
            const newFlags = [...flags];

            for(let _ of Array(10)) {
                let randomIndex1 = Math.floor(Math.random() * allFlags.length);
                let randomIndex2 = Math.floor(Math.random() * flags.length);

                const flag = allFlags[randomIndex1];
                newFlags[randomIndex2].url = flag.url;
            }
            

            return {
                ...state,
                flags: newFlags
            };
        })

        return setTimeout(randomizeFlags, 600);
    }

    useEffect(() => {
        let handle = null;
        let isMounted = true;

        const randomizeFlags = () => {
            if(!isMounted) {
                return;
            }
    
            setFlags(state => {
    
                const { flags, allFlags } = state;
                const newFlags = [...flags];
    
                for(let _ of Array(10)) {
                    let randomIndex1 = Math.floor(Math.random() * allFlags.length);
                    let randomIndex2 = Math.floor(Math.random() * flags.length);
    
                    const flag = allFlags[randomIndex1];
                    newFlags[randomIndex2].url = flag.url;
                }
                
    
                return {
                    ...state,
                    flags: newFlags
                };
            })
    
            handle = setTimeout(randomizeFlags, 600);
        }

        //handle = setTimeout(randomizeFlags, 600);

        return () => {
            isMounted = false;
            if(handle) {
                clearTimeout(handle);
                handle = null;
            }
        }
    }, [flagsState])

    const { flags } = flagsState;

    return <div className={style.container}>
        <div ref={contentRef} className={style.content}>
            <FlagsBackground size={size} flags={flags}/>
            <div className={style.banner}>
                <div>
                    <div className={style.title}>{appName}</div>
                    <div className={style.snippet}>{appDescription}</div>
                </div>
                <div className={style.actions}>
                    <Link className={style.action} to="/register">Get started</Link>
                    <Link className={style.action} to="/signin">Sign In</Link>
                </div>
            </div>
        </div>
    </div>
}



export default LandingPage