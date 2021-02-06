import React, { useEffect, useState } from "react"
import { Button, Modal, Form, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchDetails } from "../../../../actions/DetailsActions"
import * as FaIcons from "react-icons/fa"
import { MDBDataTable } from "mdbreact"
import { CSVLink } from "react-csv"
import moment from "moment"
import * as BiIcons from "react-icons/bi"
import axios from "axios"
import { useAlert } from "react-alert"

function ViewDetails() {
  const dispatch = useDispatch()
  const details = useSelector((state) => state.details)
  const [searchInput, setSearchInput] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  const [rowData, setRowData] = useState([])
  const [csvdata, setCsvdata] = useState([])
  const alert = useAlert()
  const [selectedDetail, setSelectedDetail] = useState(null)

  const [detailToUpdate, setdetailToUpdate] = useState({
    detail_customer: "",
    po_number: "",
    total_sack: "",
    description: "",
    color: "",
    size: "",
    total: "",
    qty_sack: "",
    ship_date: "",
    detail_style: "",
  })

  //modal
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //modal

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(detailToUpdate)
    const updateURL =
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":8000/api/detail-update/" +
      selectedDetail[0].id

    try {
      await axios
        .post(updateURL, detailToUpdate, {
          data: null,
          headers: {
            Authorization:
              "token " +
              JSON.parse(window.localStorage.getItem("credentials")).token,
          },
        })
        .then((res) => {
          console.log(res)
          if (res.status == 201) {
            alert.show(
              <div className="alert-suc">
                <FaIcons.FaCheck /> {res.data}
              </div>
            )
            dispatch(fetchDetails())
            handleClose()
          } else {
            alert.show(
              <div className="alert-err">
                <BiIcons.BiError /> {res.data}
              </div>
            )
          }
        })
    } catch (error) {
      console.log(error)
      alert.show(
        <div className="alert-err">
          <BiIcons.BiError /> Error! Try Again.
        </div>
      )
    }
  }

  const handleChange = (e) => {
    let qtySack = document.getElementById("qty_sack")
    let totalSack = document.getElementById("total_sack")
    let total = document.getElementById("total")
    if (total.value !== "" && qtySack.value !== "") {
      if (total.value % qtySack.value !== 0) {
        totalSack.value = Math.trunc(total.value / qtySack.value) + 1
      } else {
        totalSack.value = total.value / qtySack.value
      }
    }
    setdetailToUpdate({
      ...detailToUpdate,
      [e.target.id]: e.target.value.toUpperCase(),
    })
  }

  const handleEdit = (id) => {
    const selDetail = details.filter((it) => {
      return it.id === id
    })
    setSelectedDetail(selDetail)
    console.log(selDetail)
    handleShow()
  }

  useEffect(() => {
    if (selectedDetail && selectedDetail.length) {
      console.log(selectedDetail[0].id)
      let { active, unique_field, id, create_on, ...y } = selectedDetail[0]
      setdetailToUpdate({
        ...detailToUpdate,
        ...y,
        detail_customer: selectedDetail[0].detail_customer,
        detail_style: selectedDetail[0].detail_style.style,
      })
    }
  }, [selectedDetail])

  useEffect(() => {
    console.log(detailToUpdate)
  }, [detailToUpdate])

  const handleDelete = async (id) => {
    console.log(id)
    const deleturl =
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":8000/api/detail-delete/" +
      id
    try {
      await axios
        .delete(deleturl, {
          data: null,
          headers: {
            Authorization:
              "token " +
              JSON.parse(window.localStorage.getItem("credentials")).token,
          },
        })
        .then((res) => {
          console.log(res)
          if (res.status == 201) {
            alert.show(
              <div className="alert-suc">
                <FaIcons.FaCheck /> {res.data}
              </div>
            )
            dispatch(fetchDetails())
          } else {
            alert.show(
              <div className="alert-err">
                <BiIcons.BiError /> {res.data}
              </div>
            )
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(fetchDetails())
  }, [])

  useEffect(() => {
    console.log(details)
    if (details.length && details[0].create_on) {
      const data = details.map((i) => {
        return {
          date: moment(i.create_on).format("YYYY-MM-DD HH:MM"),
          customer: i.detail_customer.toUpperCase(),
          style: i.detail_style.style,
          po: i.po_number.toUpperCase(),
          shipdate: i.ship_date.toUpperCase(),
          color: i.color.toUpperCase(),
          size: i.size.toUpperCase(),
          total: i.total,
          totalsack: i.total_sack,
          action: (
            <Row>
              <Col sm={1}></Col>
              <Col sm={5}>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(i.id)}
                  block
                >
                  <FaIcons.FaTrashAlt /> Delete
                </Button>
              </Col>
              <Col sm={5}>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleEdit(i.id)}
                  block
                >
                  <FaIcons.FaEdit /> Edit
                </Button>
              </Col>
              <Col sm={1}></Col>
            </Row>
          ),
        }
      })
      console.log(data)
      setRowData(data)
      let csvd = details.map((i) => {
        return [
          moment(i.create_on).format("YYYY-MM-DD HH:MM"),
          i.detail_customer.toUpperCase(),
          i.detail_style.style,
          i.po_number.toUpperCase(),
          i.ship_date.toUpperCase(),
          i.color.toUpperCase(),
          i.size.toUpperCase(),
          i.total,
          i.total_sack,
        ]
      })
      csvd.unshift([
        "date",
        "customer",
        "style",
        "po#",
        "shipdate",
        "color",
        "size",
        "total",
        "totalSack",
      ])
      console.log(csvd)
      setCsvdata(csvd)
    }
  }, [details])

  const data = {
    columns: [
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Customer",
        field: "customer",
        sort: "asc",
        width: 150,
      },
      {
        label: "Style",
        field: "style",
        sort: "asc",
        width: 150,
      },
      {
        label: "PO #",
        field: "po",
        sort: "asc",
        width: 150,
      },
      {
        label: "Ship Date",
        field: "shipdate",
        sort: "asc",
        width: 150,
      },
      {
        label: "Color",
        field: "color",
        sort: "asc",
        width: 150,
      },
      {
        label: "Size",
        field: "size",
        sort: "asc",
        width: 150,
      },
      {
        label: "Total",
        field: "total",
        sort: "asc",
        width: 150,
      },
      {
        label: "Total sack",
        field: "totalsack",
        sort: "asc",
        width: 150,
      },
      {
        label: "Actions",
        field: "action",
        sort: "asc",
        width: 150,
      },
    ],
    rows: rowData,
  }

  return (
    <div className="view-item-wrapper">
      <div className="view-item-container">
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-md">
              <h6>Edit Item </h6>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/*  */}
            <div className="modal-edit">
              <Form id="form-isr">
                <Form.Group as={Row} controlId="detail_customer">
                  <Col sm="4">
                    <Form.Label>Customer:</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      disabled
                      className="form-caps"
                      value={
                        selectedDetail
                          ? selectedDetail[0].detail_customer
                          : null
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="detail_style">
                  <Col sm="4">
                    <Form.Label>Style:</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      disabled
                      className="form-caps"
                      value={
                        selectedDetail
                          ? selectedDetail[0].detail_style.style
                          : null
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="po_number">
                  <Col sm="4">
                    <Form.Label>PO Number:</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      required
                      type="text"
                      onChange={handleChange}
                      className="form-caps"
                      defaultValue={
                        selectedDetail ? selectedDetail[0].po_number : null
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="description">
                  <Col sm="4">
                    <Form.Label>Description:</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      required
                      type="text"
                      onChange={handleChange}
                      className="form-caps"
                      defaultValue={
                        selectedDetail ? selectedDetail[0].description : null
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="color">
                  <Col sm="4">
                    <Form.Label>Color:</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      required
                      type="text"
                      onChange={handleChange}
                      className="form-caps"
                      defaultValue={
                        selectedDetail ? selectedDetail[0].color : null
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="size">
                  <Col sm="4">
                    <Form.Label>Size:</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      required
                      type="text"
                      onChange={handleChange}
                      className="form-caps"
                      defaultValue={
                        selectedDetail ? selectedDetail[0].size : null
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="total">
                  <Col sm="4">
                    <Form.Label>Total:</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      required
                      type="number"
                      onChange={handleChange}
                      className="form-caps"
                      defaultValue={
                        selectedDetail ? selectedDetail[0].total : null
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="qty_sack">
                  <Col sm="4">
                    <Form.Label>Quantity / Sack:</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      required
                      type="text"
                      onChange={handleChange}
                      className="form-caps"
                      defaultValue={
                        selectedDetail ? selectedDetail[0].qty_sack : null
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="total_sack">
                  <Col sm="4">
                    <Form.Label>Total Sack:</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      required
                      type="text"
                      onChange={handleChange}
                      className="form-caps"
                      defaultValue={
                        selectedDetail ? selectedDetail[0].total_sack : null
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="ship_date">
                  <Col sm="4">
                    <Form.Label>Ship Date:</Form.Label>
                  </Col>
                  <Col sm="8">
                    <Form.Control
                      required
                      type="date"
                      onChange={handleChange}
                      className="form-caps"
                      defaultValue={
                        selectedDetail ? selectedDetail[0].ship_date : null
                      }
                    />
                  </Col>
                </Form.Group>
              </Form>
            </div>
            {/*  */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div style={{ textAlign: "center" }}>
          <h5 className="form-title">PURCHASE ORDERS</h5>
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            // borderRadius: '5px',
            height: "90%",
            overflow: "scroll",
            overflowX: "hidden",
            marginTop: "20px",
          }}
        >
          <MDBDataTable
            entries={8}
            striped
            bordered
            small
            entriesOptions={[5, 8, 10, 15]}
            striped
            hover
            className="data-style"
            data={data}
          />
          {csvdata.length ? (
            <CSVLink data={csvdata} filename={"details_data.csv"}>
              Export CSV
            </CSVLink>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ViewDetails
