import React, { useState } from "react"
import Loader from 'react-loader-spinner'
import Layout from "components/Layout";
import { useHistory } from "react-router-dom";
import { useAuth } from "AuthContext";
import { register } from "api";
import { useFormik } from 'formik';
import style from './style.scss'

const Register = () => {
    const history = useHistory();
    const [,, setAuth] = useAuth();
    const [isLoading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        },
        validate: ({email, username, password, confirmPassword}) => {
            const errors = {} as any;
    
            if(!email) {
                errors.email = "Email is required";
            }
    
            if(!username) {
                errors.username = "Username is required";
            }
            
            if(password !== confirmPassword || password === '' || confirmPassword === '') {
                errors.confirmPassword = "Passwords don't match";
            };
    
            return errors;
        },
        isInitialValid: false,
        onSubmit: values => {

            setLoading(true);
    
            register(values).then(() => {
                setAuth(state => ({...state, isLoading: true, isAuthenticated: true}))
                setTimeout(() => {
                    history.push('/user');
                }, 500)
                
            }).catch(() => {
    
                setLoading(false);
            })
        }
    });

    const { 
        values: { email, username, password, confirmPassword },
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid
    } = formik;

    return <Layout>
        {isLoading ? <Loader
                className={style.loader}
                type="Oval"
                color="#FFF"
                height={100}
                width={100}
            /> : <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.title}>
                    Register
                </div>
                <div className={style.field}>
                    <input
                        autoComplete="off"
                        className={style.input}
                        type="email"
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="email"
                        placeholder="Enter email"/>
                    {touched.email && errors.email ? <div className={style.error}>{errors.email}</div> : null}
                </div>
                <div className={style.field}>
                    <input
                        autoComplete="off"
                        className={style.input}
                        type="text"
                        value={username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="username"
                        placeholder="Enter username"/>
                    {touched.username && errors.username ? <div className={style.error}>{errors.username}</div> : null}
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
                </div>
                <div className={style.field}>
                    <input
                        className={style.input}
                        type="password"
                        value={confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="confirmPassword"
                        placeholder="Confirm password"/>
                    {touched.confirmPassword && errors.confirmPassword ? <div className={style.error}>{errors.confirmPassword}</div> : null}
                </div>
                <div className={style.field}>
                    <button disabled={!isValid} className={style.button} type="submit">Register</button>
                </div>
            </form>
            </div>}
    </Layout>
}

export default Register