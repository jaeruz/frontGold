import * as api from '../api'


export const fetchDetails = () => async (dispatch) => {
    try {
        // api get
        const { data } = await api.fetchItems();
        dispatch({type:'FETCH_ALL',payload:data})
    } catch (error) {
        console.log(error.message)
    }
}

export const addDetails = (details) => async dispatch => {
    try {
        //api post
        const res = await api.createDetails(details);
        dispatch({ type: 'CREATE_ITEM', payload: details })
        console.log(res)
    } catch (error) {
        console.log(error.message)
    }
}