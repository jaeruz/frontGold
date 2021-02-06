import React, { useEffect, useState } from "react"
import { Col, Row, Button } from "react-bootstrap"
import { Pie } from "react-chartjs-2"

function DashPie({ customerValues }) {
  const [colorList, setColorList] = useState([])
  const [randomColor, setRandomColor] = useState(false)
  useEffect(() => {
    console.log(customerValues.values.length)
    console.log(customerValues.customers)
    if (customerValues.values.length) {
      // let temp = getRandomColor(customerValues.values.length)
      let temp = []

      customerValues.customers.forEach((cust) => {
        switch (cust) {
          case "SANMAR":
            temp.push("#4caf50")
            break
          case "KOHLS":
            temp.push("#f7c600")
            break
          case "WALMART":
            temp.push("#f31b2d")
            break
          case "TOTES":
            temp.push("#cae1e1")
            break
          default:
            temp.push("79aec8")
            break
        }
      })
      console.log(temp)
      setColorList(temp)
      console.log(temp)
    }
  }, [randomColor, customerValues])

  useEffect(() => {
    console.log(colorList)
  }, [colorList])
  const data = {
    labels: customerValues.customers,
    datasets: [
      {
        label: "PIE",
        data: customerValues.values,
        backgroundColor: colorList,
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
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex]
          var meta = dataset._meta[Object.keys(dataset._meta)[0]]
          var total = meta.total
          var currentValue = dataset.data[tooltipItem.index]
          var percentage = parseFloat(((currentValue / total) * 100).toFixed(1))
          return currentValue + " (" + percentage + "%)"
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index]
        },
      },
    },
  }

  // const getRandomColor = (n) => {
  //   let letters = "0123456789ABCDEF"
  //   let color = "#"
  //   let colorArray = []
  //   for (let j = 0; j != n; j++) {
  //     for (var i = 0; i < 6; i++) {
  //       color += letters[Math.floor(Math.random() * 16)]
  //     }
  //     colorArray.push(color)
  //     color = "#"
  //   }

  //   return colorArray
  // }

  return (
    <div
      className="dash-pie-div"
      onClick={() => {
        setRandomColor(!randomColor)
      }}
    >
      <Row>
        <Col sm={1}></Col>
        <Col sm={9}>
          {customerValues.values.length ? (
            <div className="pie-container">
              <Pie data={data} options={optionsPie} responsive />
            </div>
          ) : (
            <p>No Records</p>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default DashPie
