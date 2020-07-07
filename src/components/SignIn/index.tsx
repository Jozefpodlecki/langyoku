import React, { useState, FormEvent, useEffect } from 'react'
import { useFormik } from 'formik';
import { signIn } from 'api';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'AuthContext';
import Loader from 'react-loader-spinner';
import Layout from 'components/Layout';
import style from './style.scss'

const SignIn = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [,, setAuth] = useAuth();
    const formik = useFormik({
        initialValues: {
            usernameOrEmail: '',
            password: '',
            rememberMe: false
        },
        validate: ({usernameOrEmail, password, rememberMe}) => {
            const errors = {} as any;
    
            if(!usernameOrEmail) {
                errors.usernameOrEmail = "Username/Email is required";
            }
    
            if(!password) {
                errors.username = "Password is required";
            }

            return errors;
        },
        isInitialValid: false,
        onSubmit: values => {

            setLoading(true);

            signIn(values).then(() => {
                setAuth(state => ({...state, isLoading: true, isAuthenticated: true}))
                setTimeout(() => {
                    history.push('/user');
                }, 500)
            })
        }
    });

    const { 
        values: { usernameOrEmail, password, rememberMe },
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid
    } = formik;
    
    return <Layout>
        {isLoading ?  <Loader
                className={style.loader}
                type="Oval"
                color="#FFF"
                height={100}
                width={100}
            /> : <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.title}>
                    Sign In
                </div>
                <div className={style.field}>
                    <input
                        className={style.input}
                        type="text"
                        value={usernameOrEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="usernameOrEmail"
                        placeholder="Enter username/email"/>
                    {touched.usernameOrEmail && errors.usernameOrEmail ? <div className={style.error}>{errors.usernameOrEmail}</div> : null}
                </div>
                <div className={style.field}>
                    <input
                        className={style.input}
                        type="password"
                        value={password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="password"
                        placeholder="Enter password"/>
                    {touched.password && errors.password ? <div className={style.error}>{errors.password}</div> : null}
                </div>
                <div className={style.field}>
                    <input type="checkbox"
                        checked={rememberMe}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="rememberMe"
                        name="rememberMe"/>
                    <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <div className={style.field}>
                    <button disabled={!isValid} className={style.button} type="submit">Sign In</button>
                </div>
            </form>
        </div>}
    </Layout>
}



export default SignIn