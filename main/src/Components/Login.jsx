import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {useSelector, useDispatch} from 'react-redux'
import { authenticateUser } from '../Redux/action'
import { LoginModal } from './LoginModal/LoginModal'

firebase.initializeApp({
    apiKey: "AIzaSyDJ8_Gx13M9kjVJe3wE4ECPfOF6PTeOPjU",
    authDomain: "brightigo-3aca0.firebaseapp.com"
})


export const Login = () => {

    const isAuth = useSelector(state => state.isAuth)
    const dispatch = useDispatch()

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {
            dispatch(authenticateUser(!!user))
        })
    }, [])

    return (
        <div>
            {
                isAuth? <Redirect to = "/" /> : 
                <div>
                    <LoginModal open = {true} />
                </div>
            }
        </div>
    )
}
