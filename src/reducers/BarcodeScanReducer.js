export default (barcodeScanResult = [], action) => {
    switch (action.type) {
        case 'POST_BARCODE':
            return action.payload
        case 'POST_BARCODE_ERROR':
            // alert(action.error)
            barcodeScanResult = []
            return barcodeScanResult
        default:
            return barcodeScanResult
    }
}