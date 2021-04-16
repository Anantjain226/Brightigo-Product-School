import React from 'react'
import {useSelector} from 'react-redux'
import {Route} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

export default function PrivateRoute({path, component, exact}) {

    const isAuth = useSelector(state => state.isAuth)

    return (
        <div>
            {
                isAuth? <Route path = {path} component = {component} exact = {exact} /> : 
                <Redirect to= "/login" />
            }
        </div>
    )
}
