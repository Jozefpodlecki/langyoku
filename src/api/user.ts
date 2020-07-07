import { SignInCredential } from "models/SignInCredential";
import moment from 'moment';
import { User } from "models/User";
import { getToken, signIn } from "./auth";

export const getBasicUserInfo = () => new Promise<User>((resolve, reject) => {

    const token = getToken();

    if(!token) {
        return reject('MISSING_TOKEN');
    }

    let result = JSON.parse(atob(token)) as SignInCredential

    const currentDate = moment();
    const expiresDate = moment(result.expiresAt);

    if(currentDate.isAfter(expiresDate)) {
        if(result.rememberMe) {
            return signIn(result).then(token => {
                result = JSON.parse(atob(token)) as SignInCredential
                return result;
            })
        }

        return reject('EXPIRED_TOKEN');
    }

    resolve(result as any);
})

export const getProfile = () => new Promise<any>((resolve, reject) => {
    const result = JSON.parse(localStorage.getItem('profile') || null);

    resolve(result);
})

export const saveProfile = (profile: any) => new Promise<any>((resolve, reject) => {
    localStorage.setItem('profile', JSON.stringify(profile));
    resolve();
})