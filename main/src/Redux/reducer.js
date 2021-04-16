import { GET_PROFILES_SUCCESS, GET_PROFILES_BY_ID_SUCCESS, AUTHENTICATION_SUCCESS, GET_JOB_CANDIDATES_SUCCESS, SET_CURRENT_USER_DETAILS_SUCCESS } from "./actionTypes"

const initState = {
    mentorProfiles: [],
    currentMentor: "",
    isAuth: false,
    jobCandidates: [],
    currentUser: ""
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
        default:
            return state
    }
}