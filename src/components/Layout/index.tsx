import React from "react"
import Header from "components/Header"
import Footer from "components/Footer"
import style from './style.scss'

const Layout = ({children}) => {
    return <div className={style.container}>
        <Header/>
        <div className={style.content}>
            {children}
        </div>
        <Footer/>
    </div>
}

export default Layout