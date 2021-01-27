import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getShipmentTable } from "../../../actions/StatusActions"
import { MDBDataTable } from "mdbreact"
function DashShipment() {
  const dispatch = useDispatch()
  const shipmentTable = useSelector((state) => state.shipmentTable)
  const [shipmentData, setShipmentData] = useState([])
  useEffect(() => {
    dispatch(getShipmentTable())
  }, [])

  useEffect(() => {
    console.log(shipmentTable)
    if (shipmentTable && shipmentTable.length) {
      const shipm = shipmentTable.map((i) => {
        return {
          barcode: i.barcode,
          status: i.active ? "active" : "not active",
          Days_left: i.Days_left,
        }
      })

      setShipmentData(shipm)
    }
  }, [shipmentTable])

  useEffect(() => {
    console.log(shipmentData)
  }, [shipmentData])

  const data = {
    columns: [
      {
        label: "Order",
        field: "barcode",
        sort: "asc",
        width: 150,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 150,
      },
      {
        label: "Days Left",
        field: "Days_left",
        sort: "asc",
        width: 150,
      },
    ],
    rows: shipmentData,
  }
  return (
    <div>
      <h4>Shipment</h4>
      <div className="route-wrapper">
        <div className="route-container">
          <MDBDataTable
            entries={8}
            striped
            bordered
            small
            entriesOptions={[5, 8, 10, 15]}
            striped
            hover
            className="data-style-route"
            data={data}
            sortable={true}
            // exportToCSV
          />
        </div>
      </div>
    </div>
  )
}

export default DashShipment
