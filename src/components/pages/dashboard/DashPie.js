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
      {/* <h4>QUANTITY PER CUSTOMER</h4> */}
      <Row>
        <Col sm={2}>
          {/* <div className="pie-container-text">
            <p>CUSTOMER QTY </p>
            <div>
              <span>SANMAR</span>
              <span className="val-pie">204</span>
            </div>
            <div>
              <span>KOHLS</span>
              <span className="val-pie">68</span>
            </div>
            <div>
              <span>TOTES</span>
              <span className="val-pie">112</span>
            </div>
            <div>
              <span>WALMART</span>
              <span className="val-pie">86</span>
            </div>
          </div> */}
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
