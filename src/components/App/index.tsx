import React, { useEffect, useState, useContext, createContext, useRef } from 'react';
import { Route, __RouterContext, Switch } from 'react-router';
import Loader from 'react-loader-spinner'
import LandingPage from 'components/LandingPage';
import Courses from 'components/Courses';
import Games from 'components/Games';
import SignIn from 'components/SignIn';
import style from './style.scss'
import { getToken, getProfile, getLanguageBackground } from 'api';
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
import { useProfile } from 'ProfileContext';

const Background = ({isImageLoading, image}) => {
    return <div className={style.background}>
        <div style={{
            width: 'inherit',
            height: 'inherit',
            transition: 'all .3s ease-in',
            opacity: isImageLoading ? 0 : 1,
            background: `url(${image}) center center / cover no-repeat`,
        }}></div>
    </div>
}

const App: React.SFC<any> = () => {
    const [isAuthenticated, isLoading] = useAuth();
    const [flags, setFlags] = useState([]);
    const [image, setImage] = useState('');
    const [isImageLoading, setImageLoading] = useState(true);
    const [profile] = useProfile();
    
    useEffect(() => {
        if(isAuthenticated) {
            getLanguageBackground()
                .then(image => {
                    setImage(image.background);
                    fetch(image.background)
                        .then(pr => {
                            setImageLoading(false);
                        })
                })
        }
    }, [profile, isAuthenticated]);

    useEffect(() => {
        getFlags()
            .then(flags => {
                setFlags(flags.slice(0, 25))
            })
    }, [])

    return <div className={style.layout}>
        {isAuthenticated ? <Background isImageLoading={isImageLoading} image={image}/> : <FlagsBackground flags={flags}/>}
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