import React from "react"
import { useAuth } from "AuthContext"
import { Route, Redirect } from "react-router-dom"

export const PrivateRoute = ({ redirectTo = "/signin", component: Component, ...rest }) => {
    const [isAuthenticated] = useAuth()

    return <Route {...rest} render={({ location }) => isAuthenticated ? 
        <Component/> : 
        <Redirect to={{ pathname: redirectTo, state: { from: location.pathname } }} />} />
}