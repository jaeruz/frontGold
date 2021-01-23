import * as api from "../api"

export const getItems = () => async (dispatch) => {
  try {
    // api get
    const { data } = await api.fetchItems()
    dispatch({ type: "FETCH_ITEMS", payload: data })
  } catch (error) {
    console.log(error.message)
  }
}

export const addItem = (item) => async (dispatch) => {
  try {
    //api post
    const res = await api.createItems(item)
    dispatch({ type: "CREATE_ITEM", payload: item })
    return res
  } catch (error) {
    console.log(error.message)
  }
}
