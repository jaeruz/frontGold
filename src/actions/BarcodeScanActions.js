import * as api from "../api"

export const postBarcodeDetails = (barcode) => async (dispatch) => {
  try {
    //api post
    const res = await api.postBarcode(barcode)
    dispatch({ type: "POST_BARCODE", payload: res.data })
  } catch (error) {
    dispatch({
      type: "POST_BARCODE_ERROR",
      error: barcode.barcode + " is finished",
    })
  }
}

export const fetchPurchaseDetails = () => async (dispatch) => {
  try {
    //api post
    const res = await api.fetchPurchase()
    dispatch({ type: "FETCH_BARCODE", payload: res.data })
  } catch (error) {
    dispatch({ type: "FETCH_BARCODE_ERROR", error: "err" })
  }
}

export const clearResults = () => (dispatch) => {
  dispatch({ type: "POST_BARCODE_ERROR", error: "err" })
}

export const insertBR = (br) => (dispatch) => {
  dispatch({ type: "INSERT_BR", payload: br })
}
