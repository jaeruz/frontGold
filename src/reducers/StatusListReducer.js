export default (statusList = [], action) => {
  switch (action.type) {
    case "FETCH_STATUS_LIST":
      return action.payload
    default:
      return statusList
  }
}
