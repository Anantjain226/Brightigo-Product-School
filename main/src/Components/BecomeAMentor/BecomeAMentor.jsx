import React, {useState} from 'react'
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import style from './style.module.css'
import {Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { becomeAMentor, createMentorProfile } from '../../Redux/action';
import {v4 as uuid} from 'uuid'

export default function BecomeAMentor({open}) {
    const [company, setCompany] = useState("")
    const [linkedin, setLinkedin] = useState("")
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
        console.log(mentorAlready)
        if(mentorAlready){
            history.push("/viewMentees")
        }
        else{
            const payload = {
                id: uuid(),
                name: user.displayName,
                email: user.email,
                company: company,
                photo_url: user.photoURL,
                profile_link: linkedin,
                mentees: []
            }
            console.log(payload)
            dispatch(createMentorProfile(payload))
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
                            <br />
                            <button onClick = {createMentor} > Create Profile </button>
                        </div>
                    }
                    </div>
            </Modal>
        </div>
    )
}
