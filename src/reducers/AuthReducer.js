export default (auth = [], action) => {
    switch (action.type) {
        case 'CREATE_SESSION':
            window.localStorage.setItem("credentials",JSON.stringify(action.payload))
            return action.payload
        case 'LOGOUT':
            window.localStorage.clear()
            return action.payload
        case 'AUTH_ERROR':
            window.localStorage.clear();
            return action.error
        default:
            return auth
    }
}