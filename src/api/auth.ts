import moment from 'moment';
import { SignInCredential } from 'models/SignInCredential';
import { RegisterModel } from 'models/RegisterModel';

export const register = (credential: RegisterModel) => new Promise<string>((resolve, reject) => {
    
})

export const signIn = (credential: SignInCredential) => new Promise<string>((resolve, reject) => {

    const expiresAt = moment().add(5, "hours").valueOf();

    const token = btoa(JSON.stringify({
        ...credential,
        expiresAt
    }))

    resolve(token);
}).then(token => {
    localStorage.setItem('token', token);
    return token;
})

export const clearToken = () => {
    localStorage.removeItem('token');
}

export const getToken = () => {
    return localStorage.getItem('token') || null;
}