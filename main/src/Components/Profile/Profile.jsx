import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router'
import { getProfilesById, sendMessages } from '../../Redux/action'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import style from './style.module.css'
import {v4 as uuid} from 'uuid'
import {Navbar} from '../Navbar/Navbar'
import RatingModal from '../RatingModal/RatingModal'
import ReviewsModal from '../ReviewsModal/ReviewsModal'

export const Profile = () => {
    var fileName = useRef(null)
    const [input, setInput] = useState("")
    const [file, setFile] = useState("")
    const [review, setReview] = useState("")
    const [reviewOpen, setReviewOpen] = useState(false)
    const [rating, setRating] = useState("")
    const [reviewsModalOpen, setReviewsModalOpen] = useState(false)
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    var profile = useSelector(state => state.currentMentor)
    var {email} = useSelector(state => state.currentUser)
    var user = useSelector(state => state.currentUser)

    var messages = ""
    var messagesForUpdate = ""
    var setIntervalId = ""
    useEffect(() => {
        console.log(id)
        dispatch(getProfilesById(id))

       if(!setIntervalId){
            setIntervalId = setInterval(() => {
                console.log(id)
                dispatch(getProfilesById(id))
            }, 5000)
        }

        return () => {
            clearInterval(setIntervalId)
            setIntervalId = null
        }

    },[])

    if(profile){
        messages = profile.mentees.find(item => item.email === email)
        console.log(messages)
    }


    const handleSend = () => {
        const payload = {
            id: uuid(),
            sender: email,
            message: input || URL.createObjectURL(fileName.current.files[0]),
            photo_url: user.photoURL
        }
        
        if(profile){
            console.log(profile)
            var mentee = profile.mentees.find(item => item.email == email)
            if(mentee){
                const updatedData = profile.mentees.map(item => item.email == email ? {...item, messages: [...item.messages, payload] }: item)
                const updatedProfile = {...profile, mentees: updatedData}
                dispatch(sendMessages(id, updatedProfile))
            }
            else{
                const newMentee = {
                    id: uuid(),
                    email: email,
                    photo_url: user.photoURL,
                    messages: [payload],
                    name: user.displayName
                }
                const updatedMentees = [...profile.mentees, newMentee]
                const updatedProfile = {...profile, mentees: updatedMentees}
                dispatch(sendMessages(id, updatedProfile))
            }
            // window.location.reload()
            // history.push("/profiles/id")
        }
        setInput("")
        fileName.current = null
    }

    const handleSendOnEnter = (e) => {
        if (e.keyCode === 13){
            const payload = {
                id: uuid(),
                sender: email,
                message: input || URL.createObjectURL(fileName.current.files[0]),
                photo_url: user.photoURL
            }
            
            if(profile){
                console.log(profile)
                var mentee = profile.mentees.find(item => item.email == email)
                if(mentee){
                    const updatedData = profile.mentees.map(item => item.email == email ? {...item, messages: [...item.messages, payload] }: item)
                    const updatedProfile = {...profile, mentees: updatedData}
                    dispatch(sendMessages(id, updatedProfile))
                }
                else{
                    const newMentee = {
                        id: uuid(),
                        email: email,
                        photo_url: user.photoURL,
                        messages: [payload],
                        name: user.displayName
                    }
                    const updatedMentees = [...profile.mentees, newMentee]
                    const updatedProfile = {...profile, mentees: updatedMentees}
                    dispatch(sendMessages(id, updatedProfile))
                }
                // window.location.reload()
                // history.push("/profiles/id")
            }
            setInput("")
            fileName.current = null
        } 
    }

    const sendReview = () => {
        const payload = {
            mentee_name: user.displayName,
            mentee_photo_url: user.photoURL,
            review : review
        }

        const updatedProfile = {...profile, reviews: [...profile.reviews, payload]}
        dispatch(sendMessages(id, updatedProfile))
        setReviewOpen(false)
        setReview("")
    }

    const submitRating = () => {
        const updatedProfile = {...profile, rating: [...profile.rating, Number(rating)]}
        dispatch(sendMessages(id, updatedProfile))
        setRating("")
    }

    return (
       <div>
           <Navbar />
           <div className = {style.main} >
                <div className = {style.aboutMentor} > 
                    <img src = {profile.photo_url} />
                    <h2> Hi, I'm {profile.name}! </h2>
                    <p> {profile.about_me} </p>
                    <div className = {style.askMe} >
                        <p>Ask me About : </p>
                        {
                            profile.ask_me_about && profile.ask_me_about.map(item => {
                                return(
                                    <button >
                                        {item}
                                    </button>
                                )
                            })
                        }
                    </div>
                    <br />
                    <div className = {style.review} >
                        <button onClick = {(e) => setReviewsModalOpen(true)} >See Reviews</button>
                        <button onClick = {(e) => setReviewOpen(!reviewOpen)} >Write a review</button>
                        <br />
                        {
                            reviewOpen ? 
                            <div>
                                <textarea 
                                placeholder = "Help us Improve..." 
                                rows = {3} 
                                onChange = {(e) => setReview(e.target.value)}
                                value = {review}
                            >
                            </textarea>
                            <br />
                            <button onClick = {sendReview} >Send Review</button>
                            </div>: ""
                        }
                    </div>
                </div>
                <div className  = {style.chatCont} >
                    <div className = {style.chatWindow} >
                        {
                            messages && messages? messages.messages.map(item => {
                                return(
                                    <div key = {item.id} style= {{display: "flex", justifyContent: item.sender === email ? "flex-end" : "flex-start", paddingBottom: "1em",}} >
                                        {
                                            item.sender !== email ? item.photo_url &&
                                            <div>
                                                <img className = {style.ChatAvatar} src = {item.photo_url} />
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
                                            <div>
                                                {item.message}
                                            </div>
                                        </div>
                                        {
                                            item.sender === email ? user.photoURL &&
                                            <div>
                                                <img className = {style.myChatAvatar} src = {user.photoURL} />
                                            </div> : ""
                                        }
                                    </div>
                                )
                            }) : <div className = {style.startConvo} > This is the very start of your conversation with {profile.name}! Start with an introduction of yourself :)</div>
                        }
                    </div>
                    <div className = {style.inputBox} >
                        <input type = "file" ref = {fileName} />
                        <div>
                            <input value = {input} onChange = {(e) => setInput(e.target.value)} onKeyUp = {handleSendOnEnter} />
                            <button onClick = {handleSend} > <img src ="https://icons-for-free.com/iconfiles/png/512/message+mobile+send+file+smartphone+talk+telegram+icon-1320193499208602297.png" /> </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                messages && messages.messages && messages.messages.length> 19 && messages.messages.length< 21 &&  
                <RatingModal 
                    open = {true} 
                    name = {profile.name} 
                    rating = {rating}
                    setRating = {setRating} 
                    submitRating = {submitRating}
                />
            }
            {
                reviewsModalOpen && <ReviewsModal open = {true} reviews = {profile.reviews} setReviewsModalOpen = {setReviewsModalOpen}  />
            }
        </div>
        
    )
}
