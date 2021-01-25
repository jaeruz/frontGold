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
  const [chartData, setChartData] = useState([])
  const [customerValues, setCustomerValues] = useState({
    customers: [],
    values: [],
  })
  const [totalTOTAL, setTotalTOTAL] = useState({
    codes: [],
    totals: [],
  })
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
    console.log(totalTOTAL.totals.reduce((a, b) => a + b, 0))
  }, [totalTOTAL])

  useEffect(() => {
    let tempList = []
    Object.keys(perProcessToday).forEach((ppt) => {
      tempList.push(perProcessToday[ppt])
    })
    console.log(tempList)
    setChartData(tempList)
  }, [perProcessToday])

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
      // const dateNow = new Date(Date.now())
      // const dateFmt = moment(dateNow).format("YYYY-MM-DD")

      const dateNow = new Date(Date.now())
      const dateFmt = moment(dateNow).format("YYYY-MM-DD")

      const filterTodayData = statusTable.filter((s) => s.date === dateFmt)
      // const filterTodayData = statusTable.filter((s) => s.date === "2021-01-23")

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

      let codeList = filterTodayData.map((ftd) => ftd.code)
      let uniqueCodeList = [...new Set(codeList)]
      let uniqueCodeListTotal = new Array(uniqueCodeList.length).fill(0)
      uniqueCodeList.forEach((ucl, index) => {
        filterTodayData.forEach((ftd) => {
          if (ucl === ftd.code) {
            uniqueCodeListTotal[index] = ftd.total
          }
        })
      })
      console.log("todaydata", filterTodayData)
      console.log("listtotal", uniqueCodeListTotal)

      setTotalTOTAL({
        codes: uniqueCodeList,
        totals: uniqueCodeListTotal,
      })

      let customerList = filterTodayData.map((ftd) => ftd.customer)
      let uniquecustomerList = [...new Set(customerList)]
      let uniquecustomerListQTYAdded = new Array(
        uniquecustomerList.length
      ).fill(0)
      uniquecustomerList.forEach((ucl, index) => {
        filterTodayData.forEach((ftd) => {
          if (ucl === ftd.customer) {
            uniquecustomerListQTYAdded[index] += ftd.qty
          }
        })
      })
      setCustomerValues({
        customers: uniquecustomerList,
        values: uniquecustomerListQTYAdded,
      })

      setPerProcessToday(tempPPT)
      setTableFlag(true)
    }
  }

  return (
    <div className="dash-wrapper">
      <div className="dash-container">
        <h5>DASHBOARD</h5>

        <h4>Volume For This Month</h4>
        <Row>
          <Col lg={3}>
            <DashCard
              stylclass={"dash-card-1"}
              icon={<FaIcons.FaCalendarCheck fontSize={45} />}
              val={0} //chartData.reduce((a, b) => a + b, 0)}
              caption={"ORDERS CREATED"}
            />
            <DashCard
              stylclass={"dash-card-2"}
              icon={<FaIcons.FaExclamationCircle fontSize={45} />}
              val={0}
              //   totalTOTAL.totals
              //     ? totalTOTAL.totals.reduce((a, b) => a + b, 0)
              //     : 0
              // }
              caption={"ORDERS COMPLETED"}
            />
            <DashCard
              stylclass={"dash-card-3"}
              icon={<GiIcons.GiKnapsack fontSize={45} />}
              val={130}
              caption={"ORDERS ON PROCESS"}
            />
          </Col>
          <Col lg={9}>
            <DashPie customerValues={customerValues} />
          </Col>
        </Row>
        <br />
        <hr />
        <br />
        <h4>Process Output Today</h4>
        <br />
        <div>
          {tableFlag ? (
            <DashboardTodayTable
              perProcessToday={perProcessToday}
              chartData={chartData}
              setChartData={setChartData}
            />
          ) : (
            <p>Loading..</p>
          )}
        </div>
        <br />
        <br />
        <hr />
        <br />
        <div className="dash-status-monitoring-div">
          <DashboardStatusMonitoring statusTable={statusTable} />
        </div>
        <div style={{ paddingBottom: "500px" }}></div>
      </div>
    </div>
  )
}

export default Dashboard
