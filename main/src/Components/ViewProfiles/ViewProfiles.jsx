import React from 'react'
import { useEffect } from 'react'
import { getProfiles, setUserDetails } from '../../Redux/action'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import firebase from 'firebase'
import { Navbar } from '../Navbar/Navbar'
import Grid from '@material-ui/core/Grid';
import style from "./style.module.css"

export const ViewProfiles = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const profiles = useSelector(state => state.mentorProfiles)


    const handleMentorClick = (id) => {
        history.push(`/profiles/${id}`)
    }

    useEffect(() => {
        dispatch(getProfiles())
        console.log(firebase.auth().currentUser)
        dispatch(setUserDetails(firebase.auth().currentUser))
    },[])

    console.log(profiles)

    return (
        <div>
            <Navbar />
            <div className = {style.profileCardCont} >
            <Grid container spacing = {3} >
                {
                    profiles && profiles?.map(item => {
                        return(
                            <Grid spacing = {2} container item xs = {12} sm = {6} md = {4} lg = {3} key = {item.id} >
                                <div className = {style.profileCard}>
                                    <img src= {item.photo_url} />
                                    <p> {item.name} </p>
                                    <p> Works at {item.company} </p>
                                    <a target="_blank" href = {item.profile_link}> View Profile </a> <br />
                                    <button onClick= {(e)=> handleMentorClick(item.id)}> Seek Mentorship </button>
                                </div>
                            </Grid>
                        )
                    })
                }
            </Grid>
            </div>
        </div>
    )
}
