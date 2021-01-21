import React from "react"
import { Table } from "react-bootstrap"
import { Bar } from "react-chartjs-2"

function DashboardTodayTable() {
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
  return (
    <>
      <div className="dash-today-table">
        <Table
          striped
          bordered
          hover
          style={{ backgroundColor: "white", borderRadius: "10px" }}
        >
          <thead>
            <tr>
              <th>KNIT</th>
              <th>CUT</th>
              <th>REC</th>
              <th>STEAM</th>
              <th>EXAM</th>
              <th>SEW</th>
              <th>STEAM1</th>
              <th>EXAM1</th>
              <th>TAG</th>
              <th>MD</th>
              <th>BOX</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ fontSize: "15px" }}>
              <td>504</td>
              <td>504</td>
              <td>718</td>
              <td>504</td>
              <td>718</td>
              <td>504</td>
              <td>718</td>
              <td>504</td>
              <td>718</td>
              <td>504</td>
              <td>718</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <br />
      <div className="dash-today-wrapper">
        <div className="dash-today-bar">
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  )
}

export default DashboardTodayTable
