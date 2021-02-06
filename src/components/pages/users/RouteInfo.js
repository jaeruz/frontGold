import React, { useEffect, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { getRouteTable } from "../../../actions/StatusActions"
import { useDispatch, useSelector } from "react-redux"

function RouteInfo() {
  const dispatch = useDispatch()

  const [routeTabes, setrouteTabes] = useState([])
  const routeTable = useSelector((state) => state.routeTable)
  const [keyList, setKeyList] = useState([])

  useEffect(() => {
    dispatch(getRouteTable())
  }, [])
  useEffect(() => {
    setrouteTabes(routeTable)
  }, [routeTable])

  useEffect(() => {
    if (routeTabes.length) {
      let keylist = []

      Object.keys(routeTabes[0]).forEach((rt) => {
        keylist.push({
          label: rt,
          field: rt,
          sort: "asc",
        })
      })
      setKeyList(keylist)
    }
  }, [routeTabes])
  const data = {
    columns: keyList,
    rows: routeTabes,
  }
  return (
    <div className="view-item-wrapper">
      <div className="view-item-container">
        <div style={{ width: "100%", color: "white", textAlign: "center" }}>
          <h5>Routing Info</h5>
        </div>

        <div className="route-info">
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

export default RouteInfo
