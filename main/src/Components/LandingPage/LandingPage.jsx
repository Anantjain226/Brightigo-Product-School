import React, {useEffect} from 'react'
import { Navbar } from '../Navbar/Navbar'
import style from "./style.module.css"
import companiesLogo from './Companies.png'
import Grid from '@material-ui/core/Grid';
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { getJobCandidates, openLoginModal, setUserDetails } from '../../Redux/action';
import { becomeAMentor } from '../../Redux/action';
import { LoginModal } from '../LoginModal/LoginModal';
import firebase from 'firebase'
import BecomeAMentorModal from '../BecomeAMentor/BecomeAMentor';

// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';

export default function LandingPage() {
    
    const dispatch = useDispatch()
    const history = useHistory()
    const jobCandidates = useSelector(state => state.jobCandidates)
    const loginModal = useSelector(state => state.loginModal)
    const isAuth = useSelector(state => state.isAuth)
    const becomeMentor = useSelector(state => state.becomeMentor)

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    // };

    const seeMentors = () => {
        history.push("/profiles")
    }

    const handleBecomeAMentor = () => {
        dispatch(becomeAMentor(true))
        dispatch(openLoginModal(true))
    }

    useEffect(() => {
        // dispatch(getJobCandidates())
        dispatch(setUserDetails(firebase.auth().currentUser))
    }, [])


    return (
        <div className = {style.landingPage} >
            <Navbar />
            <section className = {style.section1} >
                <p>Find Amazing Product Mentors</p>
                <p>Discover  <b>200+ </b>amazing Product Managers in India</p>
                <div>
                    <button>
                        ⚡ Find a Mentor
                    </button>
                    <button onClick = {handleBecomeAMentor}>
                        ❤️ Become a Mentor
                    </button>
                </div>
            </section>
            <section className = {style.section2}>
                <p>Trusted by the world's leading companies</p>
                <img src= {companiesLogo} />
                <p>200+ Product Managers recently added</p>
                <h1>Product Managers looking for jobs 🚀</h1>
            </section>
            <section>
                <div className = {style.joinList} >
                    <p>How we are doing this?</p>
                    <Grid container spacing = {1} >
                        <Grid  item xs = {12} sm = {6} md = {6} lg = {4}>
                            <div className = {style.icon} >🚀</div>
                            <b><p>If you're a Product Managerlooking for a job</p></b>
                            <p>Join the Managers list so hiring managers</p>
                            <p>can find you on the board.</p>
                            <button>Join the List</button>
                        </Grid>
                        <Grid  item xs = {12} sm = {6} md = {6} lg = {4}>
                            <div className = {style.icon}>❤️️</div>
                            <b><p>If you're a Product Managerlooking for a job</p></b>
                            <p>Schedule via the mentor's Calendly for</p>
                            <p>portfolio reviews, career advice, etc.</p>
                            <button onClick = {seeMentors} >See our Mentors</button>
                        </Grid>
                        <Grid  item xs = {12} sm = {6} md = {6} lg = {4} >
                            <div className = {style.icon}>💼</div>
                            <b><p>If you're hiring/recruiting Managers</p></b>
                            <p>Check our Managers list and reach out to</p>
                            <p>candidates directly or post a job.</p>
                            <button>Post a Job Listing</button>
                        </Grid>
                    </Grid>
                </div>
            </section>
            <section>
            </section>
            {
                loginModal && !isAuth? <LoginModal open = {true} /> : ""
            } 
            {
                isAuth && becomeMentor ? <BecomeAMentorModal open = {true} /> : ""
            }
        </div>
    )
}
