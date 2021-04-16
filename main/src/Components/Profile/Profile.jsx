import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { getProfilesById, sendMessages } from '../../Redux/action'
import {useDispatch, useSelector} from 'react-redux'
import style from './style.module.css'
import {v4 as uuid} from 'uuid'

export const Profile = () => {

    const [input, setInput] = useState("")
    const {id} = useParams()
    const dispatch = useDispatch()
    var profile = useSelector(state => state.currentMentor)
    var {email} = useSelector(state => state.currentUser)

    var messages = ""
    useEffect(() => {
        console.log(id)
        dispatch(getProfilesById(id))
    },[])

    if(profile){
        messages = profile.mentees.find(item => item.email === email)
    }

    const handleSend = () => {
        const payload = {
            id: uuid(),
            sender: email,
            message: input
        }
        if(profile){
            console.log(profile)
            const updatedData = profile.mentees.map(item => item.email == email ? {...item, messages: [...item.messages, payload] }: item)
            const updatedProfile = {...profile, mentees: updatedData}
            dispatch(sendMessages(id, updatedProfile))
        }
        setInput("")
    }

    return (
        <div className = {style.chatWindow} >
            {
                messages && messages.messages.map(item => {
                    return(
                        <div key = {item.id} style= {{display: "flex", justifyContent: item.sender === email ? "flex-end" : "flex-start", paddingBottom: "1em",}} >
                           
                            <div
                                style={{
                                background: email === item.sender ? "blue" : "#e5e6ea",
                                color: email === item.sender ? "white" : "black",
                                padding: "1em",
                                borderRadius: "1em",
                                maxWidth: "60%",
                                }}
                            >
                                {item.message}
                            </div>
                        </div>
                    )
                })
            }
            <input value = {input} onChange = {(e) => setInput(e.target.value)} />
            <button onClick = {handleSend} >send</button>
        </div>
    )
}
