import React, {useState} from 'react'
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import style from './style.module.css'
import {Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { becomeAMentor, createMentorProfile, getProfilesById } from '../../Redux/action';
import {v4 as uuid} from 'uuid'

export default function BecomeAMentor({open}) {
    const [company, setCompany] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [bio, setBio] = useState("")
    const [expertise, setExpertise] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(open);
    const becomeMentor = useSelector(state => state.becomeMentor)
    const profiles = useSelector(state => state.mentorProfiles)
    const user = useSelector(state => state.currentUser)
    const history = useHistory()
    const dispatch = useDispatch()
    
    const handleCancel = () => {
        setIsModalVisible(false);
        dispatch(becomeAMentor(false))
    };  

    const createMentor = () => {
        dispatch(becomeAMentor(false))
        const mentorAlready = profiles.find(item => item.email === user.email)
        if(mentorAlready){
            history.push("/viewMentees")
            dispatch(getProfilesById(mentorAlready.id))
        }
        else{
            const payload = {
                id: uuid(),
                name: user.displayName,
                email: user.email,
                company: company,
                photo_url: user.photoURL,
                profile_link: linkedin,
                mentees: [],
                about_me: bio,
                reviews: [],
                rating: [],
                ask_me_about: expertise.split(",").length > 1 ? expertise.split(",") : [expertise]
            }
            console.log(payload)
            dispatch(createMentorProfile(payload))
            dispatch(getProfilesById(payload.id))
            history.push("/viewMentees")
        }
        
    }
    return (
        <div>
            <Modal footer = {null} visible={isModalVisible} onCancel={handleCancel} className = {style.modal} >
                <div>
                    {
                        !becomeMentor? <Redirect to = "/" /> : 
                        <div>
                            <p>Where do you work?</p>
                            <input value = {company} onChange = {(e) => setCompany(e.target.value)} />
                            
                            <p>Linkedin Profile Link</p>
                            <input value = {linkedin} onChange = {(e) => setLinkedin(e.target.value)} />
                            
                            <p>Tell us about yourself</p>
                            <input value = {bio} onChange = {(e) => setBio(e.target.value)} />

                            <p>Your areas of expertise (maximum 3)</p>
                            <input value = {expertise} onChange = {(e) => setExpertise(e.target.value)} placeholder = "eg: PRD, MVP, Wireframing" />
                            <br />
                            <button className = {style.button} onClick = {createMentor} > Create Profile </button>
                        </div>
                    }
                    </div>
            </Modal>
        </div>
    )
}
