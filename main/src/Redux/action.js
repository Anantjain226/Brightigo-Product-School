import { AUTHENTICATION_REQUEST, AUTHENTICATION_SUCCESS, BECOME_MENTOR_SUCCESS, CREATE_MENTOR_PROFILE_FAILURE, CREATE_MENTOR_PROFILE_REQUEST, CREATE_MENTOR_PROFILE_SUCCESS, GET_JOB_CANDIDATES_FAILURE, GET_JOB_CANDIDATES_REQUEST, GET_JOB_CANDIDATES_SUCCESS, GET_PROFILES_BY_ID_FAILURE, GET_PROFILES_BY_ID_REQUEST, GET_PROFILES_BY_ID_SUCCESS, GET_PROFILES_FAILURE, GET_PROFILES_REQUEST, GET_PROFILES_SUCCESS, LOGIN_MODAL_SUCCESS, SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SET_CURRENT_USER_DETAILS_REQUEST, SET_CURRENT_USER_DETAILS_SUCCESS } from "./actionTypes"
import axios from 'axios'

export const getProfilesRequest = () => {
    return{
        type: GET_PROFILES_REQUEST
    }
}

export const getProfilesSuccess = (payload) => {
    return{
        type: GET_PROFILES_SUCCESS,
        payload
    }
}

export const getProfilesFailure = (payload) => {
    return{
        type: GET_PROFILES_FAILURE,
        payload
    }
}

export const getProfiles = (payload) => dispatch => {
    dispatch(getProfilesRequest())

    let config = {
        method: "GET",
        url: `http://localhost:3006/Mentor_profiles`
    }

    return axios(config)
    .then(res => {
        dispatch(getProfilesSuccess(res.data))
        // dispatch(getPersonalBoardsById(id))
    })
    .catch(err => {
        console.log(err)
        dispatch(getProfilesFailure())
    })
}

export const getProfilesByIdRequest = () => {
    return{
        type: GET_PROFILES_BY_ID_REQUEST
    }
}

export const getProfilesByIdSuccess = (payload) => {
    return{
        type: GET_PROFILES_BY_ID_SUCCESS,
        payload
    }
}

export const getProfilesByIdFailure = (payload) => {
    return{
        type: GET_PROFILES_BY_ID_FAILURE,
        payload
    }
}

export const getProfilesById = (id) => dispatch => {
    dispatch(getProfilesByIdRequest())

    let config = {
        method: "GET",
        url: `http://localhost:3006/Mentor_profiles/${id}`
    }

    return axios(config)
    .then(res => {
        dispatch(getProfilesByIdSuccess(res.data))
    })
    .catch(err => {
        console.log(err)
        dispatch(getProfilesByIdFailure())
    })
}


export const authenticationRequest = () => {
    return{
        type: AUTHENTICATION_REQUEST
    }
}

export const authenticationSuccess = (payload) => {
    return{
        type: AUTHENTICATION_SUCCESS,
        payload
    }
}

export const authenticateUser = (payload) => dispatch => {
    dispatch(authenticationRequest())

    dispatch(authenticationSuccess(payload))
}

export const getJobCandidatesRequest = () => {
    return{
        type: GET_JOB_CANDIDATES_REQUEST
    }
}

export const getJobCandidatesSuccess = (payload) => {
    return{
        type: GET_JOB_CANDIDATES_SUCCESS,
        payload
    }
}

export const getJobCandidatesFailure = (payload) => {
    return{
        type: GET_JOB_CANDIDATES_FAILURE,
        payload
    }
}

export const getJobCandidates = () => dispatch => {
    dispatch(getJobCandidatesRequest())

    let config = {
        method: "GET",
        url: `http://localhost:3006/job_candidates`
    }

    return axios(config)
    .then(res => {
        dispatch(getJobCandidatesSuccess(res.data))
    })
    .catch(err => {
        console.log(err)
        dispatch(getJobCandidatesFailure())
    })
}

export const setUserDetailsRequest = () => {
    return{
        type: SET_CURRENT_USER_DETAILS_REQUEST
    }
}

export const setUserDetailsSuccess = (payload) => {
    return{
        type: SET_CURRENT_USER_DETAILS_SUCCESS,
        payload
    }
}


export const setUserDetails = (payload) => dispatch => {
    dispatch(setUserDetailsRequest())

    dispatch(setUserDetailsSuccess(payload))
    
}


export const sendMessagesRequest = () => {
    return{
        type: SEND_MESSAGE_REQUEST
    }
}

export const sendMessagesSuccess = (payload) => {
    return{
        type: SEND_MESSAGE_SUCCESS,
        payload
    }
}

export const sendMessagesFailure = (payload) => {
    return{
        type: SEND_MESSAGE_FAILURE,
        payload
    }
}

export const sendMessages = (id, data) => dispatch => {
    dispatch(sendMessagesRequest())

    let config = {
        method: "PATCH",
        url: `http://localhost:3006/Mentor_profiles/${id}`,
        data
    }

    return axios(config)
    .then(res => {
        dispatch(getJobCandidatesSuccess(res.data))
        dispatch(getProfilesById(id))
    })
    .catch(err => {
        console.log(err)
        dispatch(getJobCandidatesFailure())
    })
}

export const becomeMentorSuccess = (payload) => {
    return{
        type: BECOME_MENTOR_SUCCESS,
        payload
    }
}

export const becomeAMentor = (payload) => dispatch => {
    dispatch(becomeMentorSuccess(payload))
}

export const loginModalSuccess = (payload) => {
    return{
        type: LOGIN_MODAL_SUCCESS,
        payload
    }
}

export const openLoginModal = (payload) => dispatch => {
    dispatch(loginModalSuccess(payload))
}

export const createMentorProfileRequest = () => {
    return{
        type: CREATE_MENTOR_PROFILE_REQUEST,
    }
}

export const createMentorProfileSuccess = () => {
    return{
        type: CREATE_MENTOR_PROFILE_SUCCESS,
    }
}

export const createMentorProfileFailure = () => {
    return{
        type: CREATE_MENTOR_PROFILE_FAILURE,
    }
}

export const createMentorProfile = (payload) => dispatch => {
    dispatch(createMentorProfileRequest())

    let config = {
        method: "POST",
        url: `http://localhost:3006/Mentor_profiles`,
        data: payload
    }

    return axios(config)
    .then(res => {
        dispatch(createMentorProfileSuccess(res.data))
        dispatch(getProfiles())
    })
    .catch(err => {
        console.log(err)
        dispatch(createMentorProfileFailure())
    })
}