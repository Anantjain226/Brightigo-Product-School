import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {useSelector, useDispatch} from 'react-redux'
import { authenticateUser } from '../Redux/action'

firebase.initializeApp({
    apiKey: "AIzaSyB3EvzjHX6t9fn0lszGbL4mfwVox_SLoXY",
    authDomain: "brightigo-49674.firebaseapp.com"
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
                isAuth? <Redirect to = "/profiles" /> : 
                <div>
                    <button onClick = {() => firebase.auth().signOut()} >SIGN OUT!</button>
                    <StyledFirebaseAuth 
                        uiConfig = {uiConfig}
                        firebaseAuth = {firebase.auth()}
                    />
                </div>
            }
        </div>
    )
}
