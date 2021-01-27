export default (shipmentTable = [], action) => {
  switch (action.type) {
    case "FETCH_SHIPMENT_TABLE":
      return action.payload
    default:
      return shipmentTable
  }
}
