export default (barcodeScanResult = [], action) => {
    switch (action.type) {
        case 'FETCH_BARCODE':
            return action.payload
        case 'POST_BARCODE':
            return action.payload
        case 'INSERT_BR':
            return action.payload
        case 'POST_BARCODE_ERROR':
            // alert(action.error)
            barcodeScanResult = []
            return barcodeScanResult
        case 'FETCH_BARCODE_ERROR':
            return barcodeScanResult
        default:
            return barcodeScanResult
    }
}