import * as api from '../api'


export const postBarcodeDetails = (barcode) => async dispatch => {
    try {
        //api post
        const res = await api.postBarcode(barcode);
        dispatch({ type: 'POST_BARCODE', payload: res.data })
        console.log(res)
    } catch (error) {
        dispatch({ type: 'POST_BARCODE_ERROR', error: barcode.barcode +" is finished" })
        console.log(error.message)
    }
}
