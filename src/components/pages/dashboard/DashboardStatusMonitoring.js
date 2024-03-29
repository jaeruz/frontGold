import React, { useState, useEffect } from "react"
import { Button, Col, Form, NavLink, Row, Table } from "react-bootstrap"
import { HorizontalBar, Doughnut } from "react-chartjs-2"
import moment from "moment"
import { CSVLink } from "react-csv"

function DashboardStatusMonitoring({ statusTable, details }) {
  const [toBeMapped, setToBeMapped] = useState([])
  const [resultState, setResultState] = useState([])
  const [uniqueResult, setUniqueResult] = useState([])

  const [custDetails, setCustDetails] = useState([])
  const [poDetails, setPoDetails] = useState([])
  const [colorDetails, setColorDetails] = useState([])
  const [styleDetails, setStyleDetails] = useState([])
  const [sizeDetails, setSizeDetails] = useState([])

  useEffect(() => {
    let custTemp = details.map((d) => d.detail_customer)
    custTemp = [...new Set(custTemp)]
    setCustDetails(custTemp)
  }, [details])

  const dataCum = {
    labels: toBeMapped.map((tbm) => tbm.process),
    datasets: [
      {
        label: "CUMULATIVE",
        data: toBeMapped.map((tbm) => {
          return tbm.qtys.reduce((a, b) => a + b, 0)
        }),
        backgroundColor: [
          "#fec107",
          "#fec107",
          "#fec107",
          "#fec107",
          "#fec107",
          "#fec107",
          "#fec107",
          "#fec107",
          "#fec107",
          "#fec107",
        ],
      },
    ],
  }

  const dataBal = {
    labels: toBeMapped.map((tbm) => tbm.process),
    datasets: [
      {
        label: "BALANCE",
        data: toBeMapped.map((tbm) => {
          return tbm.total - tbm.qtys.reduce((a, b) => a + b, 0)
        }),
        backgroundColor: [
          "#e04d57",
          "#e04d57",
          "#e04d57",
          "#e04d57",
          "#e04d57",
          "#e04d57",
          "#e04d57",
          "#e04d57",
          "#e04d57",
          "#e04d57",
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
            min: 0,
            max: 10000,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontSize: 10,
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
    customer: "ALL",
    from: "ALL",
    to: "",
    po: "",
    style: "ALL",
    color: "ALL",
    size: "ALL",
  })

  useEffect(() => {
    console.log(searchFormDetails)
    if (searchFormDetails.customer !== "ALL") {
      let poTemp = []
      let styleTemp = []
      let colorTemp = []
      let sizeTemp = []
      details.forEach((d) => {
        if (d.detail_customer === searchFormDetails.customer) {
          poTemp.push(d.po_number)
          styleTemp.push(d.detail_style.style)
          colorTemp.push(d.color)
          sizeTemp.push(d.size)
        }
      })
      poTemp = [...new Set(poTemp)]
      colorTemp = [...new Set(colorTemp)]
      styleTemp = [...new Set(styleTemp)]
      sizeTemp = [...new Set(sizeTemp)]
      setPoDetails(poTemp)
      setColorDetails(colorTemp)
      setStyleDetails(styleTemp)
      setSizeDetails(sizeTemp)
    }
  }, [searchFormDetails])

  const handleSearchForm = (e) => {
    setSearchFormDetails({
      ...searchFormDetails,
      [e.target.id]: e.target.value.toUpperCase(),
    })
  }

  const handleSubmitSearch = (e) => {
    e.preventDefault()
    console.log(details)
    // let dummy = [
    //   {
    //     code: "C1-32523-SFH$325",
    //     customer: "SANMAR",
    //     process: "cutting",
    //     qty: "12",
    //     total: "234",
    //     date: "2021-02-06",
    //   },
    //   {
    //     code: "C910-617326-MIDNIGHT HEATHER$ONE SIZE",
    //     customer: "SANMAR",
    //     process: "cutting",
    //     qty: "12",
    //     total: "234",
    //     date: "2021-02-06",
    //   },
    //   {
    //     code: "C910-6767-MIDNIGHT HEATHER$ONE SIZE",
    //     customer: "SANMAR",
    //     process: "cutting",
    //     qty: "12",
    //     total: "234",
    //     date: "2021-02-06",
    //   },
    //   {
    //     code: "302KR-11111-BLACK$ONE SIZE",
    //     customer: "TOTES",
    //     process: "boxing",
    //     qty: "12",
    //     total: "234",
    //     date: "2021-01-24",
    //   },
    //   {
    //     code: "302KR-11111-BLACK$ONE SIZE",
    //     customer: "TOTES",
    //     process: "cutting",
    //     qty: "12",
    //     total: "234",
    //     date: "2021-01-24",
    //   },
    // ]
    // const filteredST = statusTable.filter(
    //   (st) =>
    //     st.customer === searchFormDetails.customer &&
    //     new Date(st.date) >= new Date(searchFormDetails.from) &&
    //     new Date(st.date) <= new Date(searchFormDetails.to)
    // )

    const filteredST = statusTable.filter(
      (st) =>
        st.customer.includes(
          searchFormDetails.customer === "ALL" ? "" : searchFormDetails.customer
        ) &&
        st.code.includes(
          searchFormDetails.po === "ALL" ? "-" : searchFormDetails.po
        ) &&
        st.code.includes(
          searchFormDetails.style === "ALL" ? "-" : searchFormDetails.style
        ) &&
        st.code.includes(
          searchFormDetails.color === "ALL" ? "-" : searchFormDetails.color
        ) &&
        st.code.includes(
          searchFormDetails.size === "ALL" ? "-" : searchFormDetails.size
        ) &&
        new Date(st.date) >= new Date(searchFormDetails.from) &&
        new Date(st.date) <= new Date(searchFormDetails.to)
    )
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

    setResultState(result)

    let tempUnique = []
    let uResult = []
    result.forEach((cl) => {
      if (!tempUnique.includes(cl.code)) {
        uResult.push(cl)
        tempUnique.push(cl.code)
      }
    })

    setUniqueResult(uResult)
  }

  const handleViewdetails = (code, total) => {
    let filteredResult = resultState.filter((c) => c.code === code)
    let toBemapped = []

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
        cum: qtys.reduce((a, b) => a + b, 0),
        bal: total - qtys.reduce((a, b) => a + b, 0),
        code: code,
      })
    })

    toBemapped = toBemapped.filter((tb) => tb.process !== null)
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
                    as="select"
                    onChange={handleSearchForm}
                    className="form-caps"
                  >
                    <option key={0}>ALL</option>
                    {custDetails && custDetails.length
                      ? custDetails.map((cd, index) => {
                          return <option key={index}>{cd}</option>
                        })
                      : null}
                  </Form.Control>
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
              <Col lg={3}>
                <Form.Group controlId="color">
                  <Form.Label>Color:</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    onChange={handleSearchForm}
                    className="form-caps"
                  >
                    <option key={0}>ALL</option>
                    {colorDetails && colorDetails.length
                      ? colorDetails.map((cd, index) => {
                          return <option key={index}>{cd}</option>
                        })
                      : null}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group controlId="po">
                  <Form.Label>PO:</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    onChange={handleSearchForm}
                    className="form-caps"
                  >
                    <option key={0}>ALL</option>
                    {poDetails && poDetails.length
                      ? poDetails.map((pd, index) => {
                          return <option key={index}>{pd}</option>
                        })
                      : null}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group controlId="style">
                  <Form.Label>Style:</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    onChange={handleSearchForm}
                    className="form-caps"
                  >
                    <option key={0}>ALL</option>
                    {styleDetails && styleDetails.length
                      ? styleDetails.map((sd, index) => {
                          return <option key={index}>{sd}</option>
                        })
                      : null}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group controlId="size">
                  <Form.Label>size:</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    onChange={handleSearchForm}
                    className="form-caps"
                  >
                    <option key={0}>ALL</option>
                    {sizeDetails && sizeDetails.length
                      ? sizeDetails.map((sd, index) => {
                          return <option key={index}>{sd}</option>
                        })
                      : null}
                  </Form.Control>
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
                        <td>{fr.code.split("-")[2].split("$")[0]}</td>
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
                <tr>
                  <td>No Results</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <div id="detail-view"></div>

      <br />

      {/* start table per process */}
      {toBeMapped.length ? (
        <>
          <h5>Summary</h5>

          {toBeMapped.map((tb, index) => {
            return (
              <div key={index}>
                {index === 0 ? (
                  <>
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
                          COLOR :{" "}
                          <span>{tb.code.split("-")[2].split("$")[0]}</span>
                        </p>
                      </div>
                      <div>
                        <p>
                          SIZE :{" "}
                          <span>{tb.code.split("-")[2].split("$")[1]}</span>
                        </p>
                      </div>
                    </div>
                    <Row>
                      <Col lg={5}>
                        <div className="dash-status-chart-div">
                          <HorizontalBar data={dataCum} options={options} />
                        </div>
                      </Col>
                      <Col lg={5}>
                        <div className="dash-status-chart-div">
                          <HorizontalBar data={dataBal} options={options} />
                        </div>
                        {/* <Doughnut data={dataDough} options={optionsDough} /> */}
                      </Col>
                      <Col lg={1}></Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                  </>
                ) : null}
                <Row className="table-process-dash-wrapper">
                  <Col lg={8}>
                    <div className="table-process-dash">
                      <div className="process-name">
                        <h5>{tb.process.toUpperCase()}</h5>
                      </div>

                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            {tb.dates.map((tbd, index) => {
                              return <th key={index}>{tbd}</th>
                            })}
                            <td>CUM</td>
                            <td>BAL</td>
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
      {toBeMapped.length ? (
        <Row>
          <Col>
            <CSVLink data={toBeMapped} filename={"CUMULATIVE-BALANCE.csv"}>
              Export CSV
            </CSVLink>
          </Col>
        </Row>
      ) : null}
    </div>
  )
}

export default DashboardStatusMonitoring
