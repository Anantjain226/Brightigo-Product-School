import React, {useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import style from "./style.module.css"
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar';
import { getProfilesById, setCurrentMentee } from '../../Redux/action';

export default function ViewMentees() {

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.currentUser)
    var profiles = useSelector(state => state.mentorProfiles.find(item => item.email === user.email))
    
    if(profiles){
       dispatch(getProfilesById(profiles.id))
    }

    const handleMenteeClick = (id) =>{
        const mentee = profiles.mentees.find(item => item.id === id)
        dispatch(setCurrentMentee(mentee))
        history.push("/chatWindow")
    }

    useEffect(() => {
        if(profiles && profiles.mentees == undefined){
            alert("You have not registered to be a mentor on our platform")
            history.push("/")
        }
    }, [])

    

    console.log(profiles)
    return (
        <div>
            <Navbar />
            <div className = {style.MenteeCardCont} >
                <Grid container spacing = {3} >
                    {
                        profiles && profiles.mentees.length > 0 ? profiles.mentees?.map(item => {
                            return(
                                <Grid spacing = {2} container item xs = {12} sm = {6} md = {4} lg = {3} key = {item.id} >
                                    <div className = {style.MenteeCard}>
                                        <img src = {item.photo_url} />
                                        <p> {item.name} </p>
                                        <button onClick= {(e)=> handleMenteeClick(item.id)}> Chat with {item.name} </button>
                                    </div>
                                </Grid>
                            )
                        }) : <div className = {style.emptyMentees}> Welcome! Please wait for mentees to reach you out </div>
                    }
                </Grid>
            </div>
        </div>
    )
}
