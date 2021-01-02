export default (details = [], action) => {
    switch (action.type) {
        case 'FETCH_DETAILS':
            return action.payload
        case 'CREATE_DETAILS':
            return [...details, action.payload]
        default:
            return details
    }
}