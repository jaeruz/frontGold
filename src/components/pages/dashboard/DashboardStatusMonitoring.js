import React, { useState, useEffect } from "react"
import { Button, Col, Form, NavLink, Row, Table } from "react-bootstrap"
import { HorizontalBar, Doughnut } from "react-chartjs-2"
import moment from "moment"

function DashboardStatusMonitoring({ statusTable }) {
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

  let optionsDoughmini = {
    legend: {
      display: true,
      position: "left",
      labels: {
        fontColor: "black",
      },
    },
  }

  const [searchFormDetails, setSearchFormDetails] = useState({
    customer: "",
    from: "",
    to: "",
  })

  const [formatResult, setFormatResult] = useState([])
  const [detailsFlag, setDetailsFlag] = useState(false)
  const [toBeMapped, setToBeMapped] = useState([])
  const [resultState, setResultState] = useState([])
  const [uniqueResult, setUniqueResult] = useState([])

  const handleSearchForm = (e) => {
    setSearchFormDetails({
      ...searchFormDetails,
      [e.target.id]: e.target.value.toUpperCase(),
    })
  }

  const handleSubmitSearch = (e) => {
    e.preventDefault()
    const filteredST = statusTable.filter(
      (st) =>
        st.customer === searchFormDetails.customer &&
        new Date(st.date) >= new Date(searchFormDetails.from) &&
        new Date(st.date) <= new Date(searchFormDetails.to)
    )
    console.log(filteredST)

    let codeList = filteredST.map((fst) => {
      return {
        code: fst.code,
        date: fst.date,
        unID: fst.code + "*" + fst.date,
      }
    })

    /////normalizing data
    let tempList = []
    let tempData = []
    codeList.forEach((cl) => {
      if (!tempList.includes(cl.unID)) {
        tempData.push(cl)
        tempList.push(cl.unID)
      }
    })

    let uniqueCodeList = tempData

    // console.log(uniqueCodeList)

    let result = []

    uniqueCodeList.forEach((ucl) => {
      let resItem = {
        code: "",
        customer: "",
        date: "",
        total: "",
        process: [],
        qty: [],
      }
      filteredST.forEach((fst) => {
        if (ucl.code === fst.code && ucl.date === fst.date) {
          resItem.code = fst.code
          resItem.customer = fst.customer
          resItem.date = fst.date
          resItem.total = fst.total
          resItem.process.push(fst.process)
          resItem.qty.push(fst.qty)
        }
      })
      result.push(resItem)
    })
    console.log(result)
    setResultState(result)

    let tempUnique = []
    let uResult = []
    result.forEach((cl) => {
      if (!tempUnique.includes(cl.code)) {
        uResult.push(cl)
        tempUnique.push(cl.code)
      }
    })
    console.log(uResult)
    setUniqueResult(uResult)
  }

  const handleViewdetails = (code, total) => {
    console.log(code)
    // setDetailsFlag(true)
    let filteredResult = resultState.filter((c) => c.code === code)
    let toBemapped = []
    console.log(filteredResult)
    processList.forEach((pl) => {
      let dates = []
      let qtys = []
      let pro = null

      filteredResult.forEach((fr) => {
        if (fr.process.includes(pl)) {
          pro = pl
          dates.push(fr.date)
          qtys.push(fr.qty[fr.process.indexOf(pl)])
        }
      })
      toBemapped.push({
        process: pro,
        dates: dates,
        qtys: qtys,
        total: total,
        code: code,
      })
    })
    console.log(toBemapped)
    toBemapped = toBemapped.filter((tb) => tb.process !== null)
    console.log(toBemapped)
    setToBeMapped(toBemapped)
  }

  useEffect(() => {
    if (toBeMapped.length != 0) {
      var detailView = document.getElementById("detail-view")
      detailView.scrollIntoView({
        behavior: "smooth",
      })
      detailView.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [toBeMapped])

  const processList = [
    "knitting",
    "cutting",
    "sewing",
    "steaming",
    "examining",
    "boxing",
  ]
  return (
    <div>
      <h4>Process Status Monitoring</h4>
      <br />

      <Row>
        <Col lg={12}>
          <Form onSubmit={handleSubmitSearch} className="form-caps">
            <Row>
              <Col lg={4}>
                <Form.Group controlId="customer">
                  <Form.Label>Customer:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={handleSearchForm}
                    className="form-caps"
                  />
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group controlId="from">
                  <Form.Label>From:</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    onChange={handleSearchForm}
                  />
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group controlId="to">
                  <Form.Label>to:</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    min={
                      searchFormDetails
                        ? moment(searchFormDetails.from)
                            .add(1, "days")
                            .format("YYYY-MM-DD")
                        : false
                    }
                    max={
                      searchFormDetails
                        ? moment(searchFormDetails.from)
                            .add(5, "days")
                            .format("YYYY-MM-DD")
                        : false
                    }
                    onChange={handleSearchForm}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="from">
                  <Button type="submit" variant="info" block>
                    Search
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <br />
          <Table
            striped
            bordered
            hover
            className="table-weekly-dash"
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th>CUSTOMER</th>
                <th>STYLE</th>
                <th>PO#</th>
                <th>COLOR</th>
                <th>SIZE</th>
                <th>TOTAL</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {uniqueResult.length ? (
                uniqueResult.map((fr, index) => {
                  if (fr)
                    return (
                      <tr style={{ fontSize: "15px" }} key={index}>
                        <td>{fr.customer}</td>
                        <td>{fr.code.split("-")[0]}</td>
                        <td>{fr.code.split("-")[1]}</td>
                        <td>{fr.code.split("-")[2]}</td>
                        <td>{fr.code.split("-")[2].split("$")[1]}</td>
                        <td>{fr.total}</td>
                        <td>
                          <Button
                            variant="info"
                            onClick={() => {
                              handleViewdetails(fr.code, fr.total)
                            }}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    )
                })
              ) : (
                <p>No Results</p>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row id="detail-view">
        <Col>
          <NavLink variant="warning">Export CSV</NavLink>
        </Col>
      </Row>
      <br />
      {/* start table per process */}
      {toBeMapped.length ? (
        <>
          <h4>Details</h4>

          {toBeMapped.map((tb, index) => {
            return (
              <div key={index}>
                {index === 0 ? (
                  <div className="detail-detail-dash">
                    <div>
                      <p>
                        STYLE : <span>{tb.code.split("-")[0]}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        PO# : <span>{tb.code.split("-")[1]}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        STYLE :{" "}
                        <span>{tb.code.split("-")[2].split("$")[0]}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        STYLE :{" "}
                        <span>{tb.code.split("-")[2].split("$")[1]}</span>
                      </p>
                    </div>
                  </div>
                ) : null}
                <Row className="table-process-dash-wrapper">
                  <Col lg={8}>
                    <div className="table-process-dash">
                      <h5>{tb.process.toUpperCase()}</h5>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            {tb.dates.map((tbd, index) => {
                              return <th key={index}>{tbd}</th>
                            })}
                            <th>CUM</th>
                            <th>BAL</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {tb.qtys.map((tbq, index) => {
                              return <th key={index}>{tbq}</th>
                            })}
                            <td>{tb.qtys.reduce((a, b) => a + b, 0)}</td>
                            <td>
                              {tb.total - tb.qtys.reduce((a, b) => a + b, 0)}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div
                      style={{
                        width: "300px",
                        paddingLeft: "20px",
                      }}
                    >
                      <Doughnut
                        data={{
                          labels: ["CUMULATIVE", "BALANCE"],
                          datasets: [
                            {
                              label: "Doughnut",
                              data: [
                                tb.qtys.reduce((a, b) => a + b, 0),
                                tb.total - tb.qtys.reduce((a, b) => a + b, 0),
                              ],
                              backgroundColor: [
                                "#fec107",
                                "#e04d57",
                                "#f83a02",
                              ],
                            },
                          ],
                        }}
                        options={optionsDoughmini}
                      />
                    </div>
                  </Col>
                </Row>
                <hr />
              </div>
            )
          })}
        </>
      ) : null}

      {/* end table per process */}
      {/* <Row>
        <Col lg={6}>
          <div className="dash-status-chart-div">
            <HorizontalBar data={data} options={options} />
          </div>
        </Col>
        <Col lg={6}>
          <Doughnut data={dataDough} options={optionsDough} />
        </Col>
      </Row> */}
    </div>
  )
}

export default DashboardStatusMonitoring
