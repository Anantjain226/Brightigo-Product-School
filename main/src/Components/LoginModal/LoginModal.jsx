import React, {useState, useEffect} from 'react'
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {useSelector, useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { authenticateUser, getProfiles, setUserDetails } from '../../Redux/action';
import style from './style.module.css'

export const LoginModal = ({open}) => {
    const [isModalVisible, setIsModalVisible] = useState(open);

    const isAuth = useSelector(state => state.isAuth)
    const dispatch = useDispatch()

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    }

    useEffect(() => {

        dispatch(getProfiles())

        firebase.auth().onAuthStateChanged(user => {
            dispatch(authenticateUser(!!user))
        })
        // dispatch(setUserDetails(firebase.auth().currentUser))

        return () => {
            dispatch(setUserDetails(firebase.auth().currentUser))
        }

    }, [])

    useEffect(() => {
        // if(profiles && currentMentor){
        //     console.log(profiles, currentMentor)
        //     const findMentor = profiles.find(item => item.email === currentMentor.email)
        //     console.log(findMentor)
        // }
    }, [])
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    return (
        <div>
            <Modal footer = {null} visible={isModalVisible} onCancel={handleCancel} >
                <div className = {style.modal} >
                    {
                        isAuth? <Redirect to = "/" /> : 
                        <div>
                            <StyledFirebaseAuth 
                                uiConfig = {uiConfig}
                                firebaseAuth = {firebase.auth()}
                            />
                        </div>
                    }
                    </div>
            </Modal>
            
        </div>
    )
}
