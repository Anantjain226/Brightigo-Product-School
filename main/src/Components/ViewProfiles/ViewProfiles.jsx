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
    const currentMentee = useSelector(state => state.currentUser)

    const handleMentorClick = (id) => {
        history.push(`/profiles/${id}`)
    }

    useEffect(() => {
        dispatch(getProfiles())
        console.log(firebase.auth().currentUser)
        dispatch(setUserDetails(firebase.auth().currentUser))
    },[])

    console.log(currentMentee)

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
                                    {/* {
                                        item.mentees.find(data => data.email === currentMentee.email)
                                    } */}
                                    <img src= {item.photo_url}  style = {{borderRadius: "120px"}} />
                                    <div className = {style.nameCont} >
                                        <p> {item.name} </p>
                                        <a href = {item.profile_link} target = "_blank" >
                                        <img src= "https://image.flaticon.com/icons/png/512/174/174857.png" />
                                        </a>
                                    </div>
                                    <p> Works at {item.company} </p>
                                    <div className = {style.rating} >
                                        {
                                            item.rating && item.rating.length> 0 ? <p>Rating: <span> {(item.rating.reduce((a,c) => a+c))/item.rating.length}</span> </p> : <p>Rating: NA </p>
                                        }
                                    </div>

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
