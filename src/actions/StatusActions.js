import * as api from "../api"

export const getStatusList = () => async (dispatch) => {
  try {
    // api get
    const { data } = await api.fetchStatusList()
    dispatch({ type: "FETCH_STATUS_LIST", payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const getStatusTable = () => async (dispatch) => {
  try {
    //api post
    const { data } = await api.fetchStatusTable()
    dispatch({ type: "FETCH_STATUS_TABLE", payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const getRouteTable = () => async (dispatch) => {
  try {
    //api post
    const { data } = await api.fetchRouteTable()
    dispatch({ type: "FETCH_ROUTE_TABLE", payload: data })
  } catch (error) {
    console.log(error.message)
  }
}
