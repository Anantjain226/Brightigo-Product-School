import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router'
import { getProfilesById, sendMessages } from '../../Redux/action'
import {useDispatch, useSelector} from 'react-redux'
import style from './style.module.css'
import {v4 as uuid} from 'uuid'
import { Navbar } from '../Navbar/Navbar'

export const ChatWindow = () => {
    var fileName = useRef(null)
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    var mentee = useSelector(state => state.currentMentee)
    const id = mentee.id
    var {email} = useSelector(state => state.currentUser)
    var user = useSelector(state => state.currentUser)
    const currentMentor = useSelector(state => state.currentMentor)

    var data = currentMentor.mentees.find(item => item.id === id)

    console.log(data)
    const handleSend = () => {
        const payload = {
            id: uuid(),
            sender: email,
            message: input
        }   
        const updatedMessages = [...data.messages, payload]
        const updatedMenteeProfile = {...mentee, messages: updatedMessages}
        const updatedMentees = currentMentor.mentees.map(item => item.id === updatedMenteeProfile.id ? {...item, messages: updatedMessages} :  item)
        const updatedMentor = {...currentMentor, mentees: updatedMentees}
        dispatch(sendMessages(currentMentor.id, updatedMentor))
        setInput("")
    }

    var setIntervalId = ""
    useEffect(() => {
        dispatch(getProfilesById(currentMentor.id))

       if(!setIntervalId){
            setIntervalId = setInterval(() => {
                console.log(id)
                dispatch(getProfilesById(currentMentor.id))
            }, 5000)
        }

        return () => {
            clearInterval(setIntervalId)
            setIntervalId = null
        }

    },[])

    return (
       <div>
           <Navbar />
           <div className = {style.main}>
                <div className = {style.aboutMentee} > 
                    <img src = {mentee.photo_url} />
                    <h2> Hi, I'm {data.name}! </h2>
                    {/* <p> {mentee.about_me} </p> */}
                </div>
                <div className  = {style.chatCont}>
                    <div className = {style.chatWindow} >
                        {
                            data && data.messages.length >0 ? data.messages.map(item => {
                                return(
                                    <div key = {item.id} style= {{display: "flex", justifyContent: item.sender === email ? "flex-end" : "flex-start", paddingBottom: "1em",}} >
                                        {
                                            item.sender !== email ? item.photo_url &&
                                            <div>
                                                <img width= "30px" className = {style.ChatAvatar} src = {item.photo_url} />
                                            </div> : ""
                                        }
                                        <div
                                             style={{
                                                background: email === item.sender ? "RGB(148, 134, 237, 0.8)" : "#e5e6ea",
                                                color: email === item.sender ? "white" : "black",
                                                padding: "10px 15px",
                                                borderRadius: "8px",
                                                borderTopRightRadius: email === item.sender ? "0px" : "8px",
                                                borderTopLeftRadius: email === item.sender ? "8px" : "0px",
                                                maxWidth: "60%",
                                                fontWeight: 500,
                                                fontFamily: "'Montserrat', sans-serif"
                                            }}
                                        >
                                            {item.message}
                                        </div>
                                        {
                                            item.sender === email ? user.photoURL &&
                                            <div>
                                                <img width= "30px" className = {style.myChatAvatar} src = {user.photoURL} />
                                            </div> : ""
                                        }
                                    </div>
                                )
                            }) : <div className = {style.startConvo} > This is the very start of your conversation with {mentee.name}! </div>
                        }
                    </div>
                    <div className = {style.inputBox} >
                        <input type = "file" ref = {fileName} />
                        <div>
                            <input value = {input} onChange = {(e) => setInput(e.target.value)} />
                            <button onClick = {handleSend} > <img src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMXgjmrEjgxXXiCwn7UR1PW_6GXA67tqFbFw&usqp=CAU" /> </button>
                        </div>
                    </div>
                </div>
           </div>
       </div>
    )
}
