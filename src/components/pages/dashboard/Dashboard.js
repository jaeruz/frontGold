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

function Dashboard() {
  const dispatch = useDispatch()
  const details = useSelector((state) => state.details)

  useEffect(() => {
    dispatch(fetchDetails())
  }, [])

  useEffect(() => {
    details.map((d) => {
      console.log(d)
    })
  }, [details])

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
          <DashboardTodayTable />
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
