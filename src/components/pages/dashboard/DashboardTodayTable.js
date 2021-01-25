import React, { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { Bar } from "react-chartjs-2"

function DashboardTodayTable({ perProcessToday, setChartData, chartData }) {
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
        data: chartData,
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
    scales: {
      xAxes: [
        {
          ticks: {
            fontSize: 8,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontSize: 10,
            min: 0,
            max: 10000,
          },
        },
      ],
    },
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
            <tr style={{ fontSize: "15px", textAlign: "center" }}>
              {perProcessToday
                ? chartData.map((cd, index) => {
                    return <td key={index}>{cd}</td>
                  })
                : null}
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
