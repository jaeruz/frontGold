export default (statusTable = [], action) => {
  switch (action.type) {
    case "FETCH_STATUS_TABLE":
      return action.payload
    default:
      return statusTable
  }
}
