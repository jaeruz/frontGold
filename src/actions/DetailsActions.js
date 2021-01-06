import * as api from '../api'


export const fetchDetails = () => async (dispatch) => {
    try {
        // api get
        const { data } = await api.fetchDetails();
        dispatch({type:'FETCH_DETAILS',payload:data})
    } catch (error) {
        console.log(error.message)
    }
}

export const addDetails = (details) => async dispatch => {
    try {
        //api post
        const res = await api.createDetails(details);
        dispatch({ type: 'CREATE_DETAILS', payload: details })
        return res
    } catch (error) {
        console.log(error.message)
    }
}


