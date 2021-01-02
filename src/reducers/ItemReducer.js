export default (item = [], action) => {
    switch (action.type) {
        case 'FETCH_ITEMS':
            return action.payload
        case 'CREATE_ITEM':
            return [...item, action.payload]
        default:
            return item
    }
}