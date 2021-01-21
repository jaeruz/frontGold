import React from "react"
import { Button, Col, Form, Row, Table } from "react-bootstrap"
import { HorizontalBar, Doughnut } from "react-chartjs-2"
function DashboardStatusMonitoring() {
  const data = {
    labels: [
      "KNIT",
      "CUT",
      "REC",
      "STEAM",
      "EXAM",
      "SEW",
      "STEAM1",
      "EXAM1",
      "TAG",
      "MD",
      "BOX",
    ],
    datasets: [
      {
        label: "Process status",
        data: [10, 20, 35, 21, 53, 11, 34, 32, 35, 21, 11],
        backgroundColor: [
          "#fec107",
          "#2ab7ca",
          "#e04d57",
          "#f83a02",
          "#e2bd57",
          "#2affca",
          "#864d57",
          "#f83a02",
          "#4aeeca",
          "#f83a02",
          "#2ab7ca",
        ],
      },
    ],
  }
  let options = {
    legend: {
      responsive: true,
      maintainAspectRatio: false,
      display: true,
      position: "top",
      labels: {
        fontColor: "black",
      },
    },
  }

  const dataDough = {
    labels: ["CUMULATIVE", "BALANCE"],
    datasets: [
      {
        label: "Doughnut",
        data: [10, 20],
        backgroundColor: ["#fec107", "#e04d57", "#f83a02"],
      },
    ],
  }

  let optionsDough = {
    legend: {
      display: true,
      position: "top",
      labels: {
        fontColor: "black",
      },
    },
  }
  return (
    <div>
      <h4>Process Status Monitoring</h4>
      <br />

      <Row>
        <Col lg={7}>
          <Form>
            <Form.Group>
              <Form.Label>Search by date:</Form.Label>
            </Form.Group>
            <Row>
              <Col lg={6}>
                <Form.Group controlId="from">
                  <Form.Label>From:</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="to">
                  <Form.Label>to:</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Table
            striped
            bordered
            hover
            style={{ backgroundColor: "white", borderRadius: "10px" }}
          >
            <thead>
              <tr>
                <th>CUSTOMER</th>
                <th>PO#</th>
                <th>CUSTOMER</th>
                <th>COLOR</th>
                <th>CUMULATIVE</th>
                <th>BALANCE</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ fontSize: "15px" }}>
                <td>504</td>
                <td>504</td>
                <td>504</td>
                <td>718</td>
                <td>504</td>
                <td>718</td>
              </tr>
              <tr style={{ fontSize: "15px" }}>
                <td>504</td>
                <td>504</td>
                <td>504</td>
                <td>718</td>
                <td>504</td>
                <td>718</td>
              </tr>
              <tr style={{ fontSize: "15px" }}>
                <td>504</td>
                <td>504</td>
                <td>504</td>
                <td>718</td>
                <td>504</td>
                <td>718</td>
              </tr>
              <tr style={{ fontSize: "15px" }}>
                <td>504</td>
                <td>504</td>
                <td>504</td>
                <td>718</td>
                <td>504</td>
                <td>718</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col lg={5}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <Button variant="info" block>
            Export CSV
          </Button>
          <Button variant="warning" block>
            Reset
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col lg={6}>
          <div className="dash-status-chart-div">
            <HorizontalBar data={data} options={options} />
          </div>
        </Col>
        <Col lg={6}>
          <Doughnut data={dataDough} options={optionsDough} />
        </Col>
      </Row>
    </div>
  )
}

export default DashboardStatusMonitoring
