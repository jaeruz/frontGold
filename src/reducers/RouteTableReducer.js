export default (routeTable = [], action) => {
  switch (action.type) {
    case "FETCH_ROUTE_TABLE":
      return action.payload
    default:
      return routeTable
  }
}
