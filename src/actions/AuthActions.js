import * as api from '../api'


export const postCredentials = (credentials) => async dispatch => {
    try {
        //api post
        const res = await api.postCreds(credentials);
        console.log(res.data)
        dispatch({ type: 'CREATE_SESSION', payload: res.data })
        
    } catch (error) {
        dispatch({ type: 'AUTH_ERROR', error: "Invalid Credentials" })
        console.log(error.message)
        return error.message.split(' ')[error.message.split(' ').length-1]
    }
}

export const logout = () =>  dispatch => {
    try {
        //api post
        dispatch({ type: 'LOGOUT', payload: null })
        
    } catch (error) {
        dispatch({ type: 'AUTH_ERROR', error:"Invalid Credentials" })
        console.log(error.message)
    }
}
