import React from "react"
import { Col, Row } from "react-bootstrap"
import { Pie } from "react-chartjs-2"

function DashPie() {
  const data = {
    labels: ["SANMAR", "KOHLS", "TOTES", "WALMART"],
    datasets: [
      {
        label: "PIE",
        data: [10, 20, 35, 21],
        backgroundColor: ["#fec107", "#2ab7ca", "#e04d57", "#f83a02"],
      },
    ],
  }

  let optionsPie = {
    legend: {
      display: true,
      position: "left",
      labels: {
        fontColor: "black",
      },
    },
  }
  return (
    <div className="dash-pie-div">
      <Row>
        <Col sm={2}>
          
        </Col>
        <Col sm={8}>
          <div className="pie-container">
            <Pie data={data} options={optionsPie} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default DashPie
