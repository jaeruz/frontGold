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
  // const routeTable = useSelector((state) => state.routeTable)
  const statusTable = useSelector((state) => state.statusTable)
  const details = useSelector((state) => state.details)
  // const statusList = useSelector((state) => state.statusList)

  const [tableFlag, setTableFlag] = useState(false)
  const [chartData, setChartData] = useState([])
  const [monthDetails, setMonthDetails] = useState([])
  const [monthDetailsStatus, setMonthDetailsStatus] = useState({
    onProcess: 0,
    completed: 0,
  })
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
    dispatch(fetchDetails())
  }, [])

  useEffect(() => {
    console.log(details)
    if (details && details.length) {
      let filteredDetails = details.filter(
        (d) =>
          moment(d.create_on).format("MMM") === moment(new Date()).format("MMM")
      )
      let ordersCompleted = filteredDetails.filter((fd) => !fd.active)
      let ordersOnProcess = filteredDetails.filter((fd) => fd.active)

      setMonthDetailsStatus({
        onProcess: ordersOnProcess.length,
        completed: ordersCompleted.length,
      })
      setMonthDetails(filteredDetails)
    }
  }, [details])

  useEffect(() => {
    console.log(monthDetailsStatus)
  }, [monthDetailsStatus])

  useEffect(() => {
    console.log(monthDetails)
    if (monthDetails.length) {
      let uCustList = []
      monthDetails.forEach((md) => {
        if (!uCustList.includes(md.detail_customer)) {
          uCustList.push(md.detail_customer)
        }
      })
      let uCustListVals = []
      uCustList.forEach((ucl) => {
        let val = 0
        monthDetails.forEach((md) => {
          if (ucl === md.detail_customer) {
            val++
          }
        })
        uCustListVals.push(val)
      })
      console.log(uCustList)
      console.log(uCustListVals)
      setCustomerValues({
        customers: uCustList,
        values: uCustListVals,
      })
    }
  }, [monthDetails])

  useEffect(() => {
    let tempList = []
    Object.keys(perProcessToday).forEach((ppt) => {
      tempList.push(perProcessToday[ppt])
    })
    setChartData(tempList)
  }, [perProcessToday])

  useEffect(() => {
    todayQuantityPerProcess()
  }, [statusTable])

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

      // let codeList = filterTodayData.map((ftd) => ftd.code)
      // let uniqueCodeList = [...new Set(codeList)]
      // let uniqueCodeListTotal = new Array(uniqueCodeList.length).fill(0)
      // uniqueCodeList.forEach((ucl, index) => {
      //   filterTodayData.forEach((ftd) => {
      //     if (ucl === ftd.code) {
      //       uniqueCodeListTotal[index] = ftd.total
      //     }
      //   })
      // })

      // setTotalTOTAL({
      //   codes: uniqueCodeList,
      //   totals: uniqueCodeListTotal,
      // })

      // let customerList = filterTodayData.map((ftd) => ftd.customer)
      // let uniquecustomerList = [...new Set(customerList)]
      // let uniquecustomerListQTYAdded = new Array(
      //   uniquecustomerList.length
      // ).fill(0)
      // uniquecustomerList.forEach((ucl, index) => {
      //   filterTodayData.forEach((ftd) => {
      //     if (ucl === ftd.customer) {
      //       uniquecustomerListQTYAdded[index] += ftd.qty
      //     }
      //   })
      // })
      // setCustomerValues({
      //   customers: uniquecustomerList,
      //   values: uniquecustomerListQTYAdded,
      // })

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
            <div className="dash-card-wrapper">
              <DashCard
                stylclass={"dash-card-1"}
                icon={<FaIcons.FaCalendarCheck fontSize={45} />}
                val={monthDetails.length}
                caption={"ORDERS CREATED"}
              />
              <DashCard
                stylclass={"dash-card-2"}
                icon={<FaIcons.FaExclamationCircle fontSize={45} />}
                val={monthDetailsStatus.completed}
                //   totalTOTAL.totals
                //     ? totalTOTAL.totals.reduce((a, b) => a + b, 0)
                //     : 0
                // }
                caption={"ORDERS COMPLETED"}
              />
              <DashCard
                stylclass={"dash-card-3"}
                icon={<GiIcons.GiKnapsack fontSize={45} />}
                val={monthDetailsStatus.onProcess}
                caption={"ORDERS ON PROCESS"}
              />
            </div>
          </Col>
          <Col lg={9}>
            <div className="dash-pie-wrapper">
              <DashPie customerValues={customerValues} />
            </div>
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
