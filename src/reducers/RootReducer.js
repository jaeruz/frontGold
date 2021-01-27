import { combineReducers } from "redux"
import item from "./ItemReducer"
import details from "./DetailsReducer"
import barcodeScanResult from "./BarcodeScanReducer"
import auth from "./AuthReducer"
import statusList from "./StatusListReducer"
import statusTable from "./StatusTableReducer"
import routeTable from "./RouteTableReducer"
import shipmentTable from "./ShipmentReducer"

export default combineReducers({
  item: item,
  details: details,
  barcodeScanResult: barcodeScanResult,
  auth: auth,
  statusList: statusList,
  statusTable: statusTable,
  routeTable: routeTable,
  shipmentTable: shipmentTable,
})
