import React from 'react'
import { Route, Switch } from 'react-router'
import LandingPage from '../Components/LandingPage/LandingPage'
import { Login } from '../Components/Login'
import { Profile } from '../Components/Profile/Profile'
import { ViewProfiles } from '../Components/ViewProfiles/ViewProfiles'
import PrivateRoute from './PrivateRoute'

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path = "/" exact component = {LandingPage} />
                <Route path = "/login" exact component = {Login} />
                <PrivateRoute path = "/profiles" exact component = {ViewProfiles} />
                <PrivateRoute path = "/profiles/:id" exact component = {Profile} />
            </Switch>
        </div>
    )
}
