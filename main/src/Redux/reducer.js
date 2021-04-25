import { GET_PROFILES_SUCCESS, GET_PROFILES_BY_ID_SUCCESS, AUTHENTICATION_SUCCESS, GET_JOB_CANDIDATES_SUCCESS, SET_CURRENT_USER_DETAILS_SUCCESS, BECOME_MENTOR_SUCCESS, LOGIN_MODAL_SUCCESS, SET_CURRENT_MENTEE_SUCCESS } from "./actionTypes"

const initState = {
    mentorProfiles: [],
    currentMentor: "",
    isAuth: false,
    jobCandidates: [],
    currentUser: "",
    alreadyAMentor: "",
    becomeMentor: false,
    loginModal: false,
    currentMentee: ""
}

export const reducer = (state = initState, {type, payload}) => {
    switch(type){
        case GET_PROFILES_SUCCESS:
            return{
                ...state,
                mentorProfiles: payload
            }
        case GET_PROFILES_BY_ID_SUCCESS:
            return{
                ...state,
                currentMentor: payload
            }
        case AUTHENTICATION_SUCCESS:
            return{
                ...state,
                isAuth: payload
            }
        case GET_JOB_CANDIDATES_SUCCESS:
            return{
                ...state,
                jobCandidates: payload
            }
        case SET_CURRENT_USER_DETAILS_SUCCESS:
            return{
                ...state,
                currentUser: payload
            }
        case BECOME_MENTOR_SUCCESS:
            console.log(payload)
            return{
                ...state,
                becomeMentor: payload
            }
        case LOGIN_MODAL_SUCCESS:
            return{
                ...state,
                loginModal: payload
            }
        case SET_CURRENT_MENTEE_SUCCESS:
            return{
                ...state,
                currentMentee: payload
            }
        default:
            return state
    }
}