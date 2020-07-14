import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter} from 'react-router-dom'
import App from './components/App';
import './global.scss'
import { AuthProvider } from 'AuthContext';
import { ProfileProvider } from 'ProfileContext';

const root = document.getElementById("root");

ReactDOM.render(
    <AuthProvider>
        <ProfileProvider>
            <HashRouter>
                <App/>
            </HashRouter>
        </ProfileProvider>\
    </AuthProvider>,
    root
)