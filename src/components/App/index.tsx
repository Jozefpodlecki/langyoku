import React, { useEffect, useState, useContext, createContext, useRef } from 'react';
import { Route, __RouterContext, Switch } from 'react-router';
import Loader from 'react-loader-spinner'
import LandingPage from 'components/LandingPage';
import Courses from 'components/Courses';
import Games from 'components/Games';
import SignIn from 'components/SignIn';
import style from './style.scss'
import { getToken } from 'api';
import { PrivateRoute } from 'PrivateRoute';
import { useAuth } from 'AuthContext';
import User from 'components/User';
import Flashcard from 'components/Flashcard';
import Course from 'components/Course';
import Crosswords from 'components/Crosswords';
import MemoryGame from 'components/MemoryGame';
import Register from 'components/Register';
import FlagsBackground from 'components/FlagsBackground';
import { getFlags } from 'data/flags';

const Background = ({image}) => {
    return <div style={{
        background: `url(${image}) center center / cover no-repeat`,
    }} className={style.background}></div>
}

const App: React.SFC<any> = () => {
    const [isAuthenticated, isLoading] = useAuth();
    const image = require(`assets/images/holger-link-hD6avFQfPzw-unsplash.jpg`).default;
    const [flags, setFlags] = useState([]);
    
    useEffect(() => {        
        getFlags()
            .then(flags => {
                setFlags(flags.slice(0, 25))
            })
    }, [])

    return <div className={style.layout}>
        {/* <Background image={image}/> */}
        <FlagsBackground flags={flags}/>
        {isLoading ?
            <Loader
                className={style.loader}
                type="Oval"
                color="#FFF"
                height={100}
                width={100}
            /> : <Switch>
            <PrivateRoute exact path="/user/crosswords" component={Crosswords}/>
            <PrivateRoute exact path="/user/memorygame" component={MemoryGame}/>
            <PrivateRoute exact path="/user/flashcard/:id" component={Flashcard}/>
            <PrivateRoute exact path="/user/course/:id" component={Course}/>
            <PrivateRoute path="/user" component={User}/>
            {isAuthenticated && <Route exact path="/" component={User}/>}
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/signin" component={SignIn}/>
        </Switch>}
    </div>
}

export default App;