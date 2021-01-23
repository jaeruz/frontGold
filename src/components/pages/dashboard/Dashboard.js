import React, { useState, useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchDetails } from "../../../actions/DetailsActions"
import DashCard from "./DashCard"
import DashPie from "./DashPie"
import * as GiIcons from "react-icons/gi"
import * as FaIcons from "react-icons/fa"
import DashboardTodayTable from "./DashboardTodayTable"
import DashboardStatusMonitoring from "./DashboardStatusMonitoring"
import moment from "moment"
import {
  getRouteTable,
  getStatusList,
  getStatusTable,
} from "../../../actions/StatusActions"

function Dashboard() {
  const dispatch = useDispatch()
  const routeTable = useSelector((state) => state.routeTable)
  const statusTable = useSelector((state) => state.statusTable)
  const statusList = useSelector((state) => state.statusList)

  const [tableFlag, setTableFlag] = useState(false)
  const [perProcessToday, setPerProcessToday] = useState({
    KNITTING: 0,
    CUTTING: 0,
    RECEIPTS: 0,
    STEAMING: 0,
    EXAMINING: 0,
    SEWING: 0,
    STEAMING_1: 0,
    EXAMINING_1: 0,
    TAGGING: 0,
    METALDETECT: 0,
    BOXING: 0,
  })

  useEffect(() => {
    dispatch(getRouteTable())
    dispatch(getStatusList())
    dispatch(getStatusTable())
  }, [])

  useEffect(() => {
    console.log(routeTable)
  }, [routeTable])

  useEffect(() => {
    console.log(statusTable)
    todayQuantityPerProcess()
  }, [statusTable])

  useEffect(() => {
    console.log(statusList)
  }, [statusList])

  const todayQuantityPerProcess = () => {
    if (statusTable && statusTable.length) {
      const dateNow = new Date(Date.now())
      const dateFmt = moment(dateNow).format("YYYY-MM-DD")

      const filterTodayData = statusTable.filter((s) => s.date === dateFmt)

      let tempPPT = {
        KNITTING: 0,
        CUTTING: 0,
        RECEIPTS: 0,
        STEAMING: 0,
        EXAMINING: 0,
        SEWING: 0,
        STEAMING_1: 0,
        EXAMINING_1: 0,
        TAGGING: 0,
        METALDETECT: 0,
        BOXING: 0,
      }
      filterTodayData.forEach((ftd) => {
        Object.keys(tempPPT).forEach((ppt) => {
          if (ppt.toString() === ftd.process.toString().toUpperCase()) {
            tempPPT[ppt] += ftd.qty
          }
        })
      })
      console.log(tempPPT)
      setPerProcessToday(tempPPT)
      setTableFlag(true)
    }
  }

  return (
    <div className="dash-wrapper">
      <div className="dash-container">
        <h5>DASHBOARD</h5>

        <h4>Volume Today</h4>
        <Row>
          <Col lg={3}>
            <DashCard
              stylclass={"dash-card-1"}
              icon={<FaIcons.FaCalendarCheck fontSize={45} />}
              val={353}
              caption={"CUMULATIVE OUTPUT"}
            />
            <DashCard
              stylclass={"dash-card-2"}
              icon={<FaIcons.FaExclamationCircle fontSize={45} />}
              val={185}
              caption={"REMAINING BALANCE"}
            />
            <DashCard
              stylclass={"dash-card-3"}
              icon={<GiIcons.GiKnapsack fontSize={45} />}
              val={130}
              caption={"TOTAL SACKS CREATED"}
            />
          </Col>
          <Col lg={9}>
            <DashPie />
          </Col>
        </Row>
        <br />
        <div>
          {tableFlag ? (
            <DashboardTodayTable perProcessToday={perProcessToday} />
          ) : (
            <p>Loading..</p>
          )}
        </div>
        <br />
        <hr />
        <br />
        <div className="dash-status-monitoring-div">
          <DashboardStatusMonitoring />
        </div>
        <div style={{ paddingBottom: "500px" }}></div>
      </div>
    </div>
  )
}

export default Dashboard
