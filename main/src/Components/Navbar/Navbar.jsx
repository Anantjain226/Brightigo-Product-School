import React from 'react'
import styles from './style.module.css'
import firebase from 'firebase'
import { useHistory } from 'react-router'
import {useSelector, useDispatch} from 'react-redux'
import { openLoginModal, setUserDetails } from '../../Redux/action'

export const Navbar = () => {
    const history = useHistory()
    const dispatch= useDispatch()
    const isAuth = useSelector(state => state.isAuth)
    const loginModal = useSelector(state => state.loginModal)

    const logoClick = () => {
        history.push("/")
    }

    const handleLoginModal= () =>{
        dispatch(openLoginModal(true))
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
        dispatch(setUserDetails(""))
        history.push("/")
        dispatch(openLoginModal(false))
    }

    return (
        <section className = {styles.navBar} >
            <img src = "https://producthyre.com/images/logo.png" onClick = {logoClick}/>
            <div className = {styles.div1} >
                <div>Post Jobs</div>
                <div>Hire Product Managers!</div>
            </div>
            <div className = {styles.div2} >
                {
                    !isAuth? <button onClick = {handleLoginModal} >Sign In</button> : <button onClick = {handleSignOut} >Sign Out</button>
                }
            </div>
        </section>
    )
}
