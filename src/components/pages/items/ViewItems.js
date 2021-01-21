import React, { useEffect, useState } from "react"
import { Container, Table, Form, Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getItems } from "../../../actions/ItemActions"
import * as FaIcons from "react-icons/fa"
import { MDBDataTable } from "mdbreact"
import { CSVLink } from "react-csv"
import moment from "moment"

function ViewItems() {
  const dispatch = useDispatch()
  const item = useSelector((state) => state.item)

  //modal
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [searchInput, setSearchInput] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  //modal

  const [rowData, setRowData] = useState([])
  const [csvdata, setCsvdata] = useState([])

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
        label: "Process",
        field: "process",
        sort: "asc",
        width: 150,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 150,
      },
    ],
    rows: rowData,
  }

  const [ItemClass, setItemClass] = useState({
    process: [],
    customer: "",
    style: "",
  })

  useEffect(() => {
    dispatch(getItems())
  }, [])

  useEffect(() => {
    console.log(item)
    if (item && item.length) {
      const data = item.map((i) => {
        return {
          date: moment(i.create_on).format("YYYY-MM-DD HH:MM"),
          customer: i.customer.toUpperCase(),
          style: i.style.toUpperCase(),
          process: i.process.map((p, index) => {
            if (index !== i.process.length - 1) {
              return (p + ", ").toUpperCase()
            } else {
              return p.toUpperCase()
            }
          }),
          action: (
            <Button
              variant="info"
              size="sm"
              onClick={() => handleEdit(i)}
              block
            >
              <FaIcons.FaEdit /> Edit
            </Button>
          ),
        }
      })
      console.log(data)
      setRowData(data)
      let csvd = item.map((i) => {
        return [
          moment(i.create_on).format("YYYY-MM-DD HH:MM"),
          i.customer.toUpperCase(),
          i.style.toUpperCase(),
          i.process.map((p, index) => {
            if (index !== i.process.length - 1) {
              return (p + ", ").toUpperCase()
            } else {
              return p.toUpperCase()
            }
          }),
        ]
      })
      csvd.unshift(["date", "customer", "style", "process"])
      console.log(csvd)
      setCsvdata(csvd)
    }
  }, [item])

  const handleFormChange = (e) => {
    setItemClass({
      ...ItemClass,
      [e.target.id]: e.target.value,
    })
  }

  const handleChange = (e) => {
    let processList = []
    let checkboxes = document.querySelectorAll("input[type=checkbox]:checked")
    for (let i = 0; i < checkboxes.length; i++) {
      processList.push(checkboxes[i].value)
    }
    setItemClass({
      ...ItemClass,
      process: processList,
    })
  }

  const [selectedItems, setSelectedItems] = useState(null)

  const handleEdit = (i) => {
    const selItem = item.filter((it) => {
      return it.style === i.style
    })
    setSelectedItems(selItem)
    setItemClass({
      style: i.style.toUpperCase(),
      customer: i.customer.toUpperCase(),
      process: i.process,
    })
    handleShow()
  }

  useEffect(() => {
    if (show) {
      let processCheckbox = document.getElementById("check1")
      if (processCheckbox && selectedItems && setSelectedItems.length) {
        console.log(processCheckbox.length)
        let checklength =
          selectedItems[0].customer.toUpperCase() === "TOTES" ? 14 : 12
        console.log(checklength)
        for (let i = 1; i != checklength; i++) {
          for (let j = 0; j != selectedItems[0].process.length; j++) {
            if (
              document.getElementById(`check${i}`).value ===
              selectedItems[0].process[j]
            ) {
              document.getElementById(`check${i}`).checked = true
            }
          }
        }
      }
    }
  }, [show])

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
            <Modal.Title id="example-modal-sizes-title-lg">
              Edit Item
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItems && selectedItems.length ? (
              <div className="modal-edit">
                <Form id="form-add-item">
                  <Form.Group controlId="customer">
                    <Form.Label>Customer:</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Customer"
                      defaultValue={selectedItems[0].customer}
                      onChange={handleFormChange}
                      className="form-caps"
                    />
                  </Form.Group>
                  <Form.Group controlId="style">
                    <Form.Label>Style:</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Style"
                      defaultValue={selectedItems[0].style}
                      onChange={handleFormChange}
                      className="form-caps"
                    />
                  </Form.Group>
                  {selectedItems[0].customer.toUpperCase() === "TOTES" ? (
                    <Form.Group>
                      <Form.Label>Process:</Form.Label>
                      <Form.Check
                        label="Knitting"
                        value="knitting"
                        id="check1"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="ISR 1"
                        value="isr_1"
                        id="check2"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="B1 Receipts"
                        value="reciepts"
                        id="check3"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Steaming"
                        value="steaming"
                        id="check4"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Examining"
                        value="examining"
                        id="check5"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="ISR 2"
                        value="isr_2"
                        id="check6"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Sewing"
                        value="sewing"
                        id="check7"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="ISR 3"
                        value="isr_3"
                        id="check8"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Steaming 1"
                        value="steaming_1"
                        id="check9"
                        onChange={handleChange}
                      />

                      <Form.Check
                        label="Examining 1"
                        value="examining_1"
                        id="check10"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Tagging"
                        value="tagging"
                        id="check11"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Metal Detection"
                        value="metaldetect"
                        id="check12"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Boxing"
                        value="boxing"
                        id="check13"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ) : (
                    <Form.Group>
                      <Form.Label>Process:</Form.Label>
                      <Form.Check
                        label="Knitting"
                        value="knitting"
                        id="check1"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Cutting"
                        value="cutting"
                        id="check2"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="ISR 1"
                        value="isr_1"
                        id="check3"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Sewing"
                        value="sewing"
                        id="check4"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="ISR 2"
                        value="isr_2"
                        id="check5"
                        onChange={handleChange}
                      />

                      <Form.Check
                        label="B1 Receipts"
                        value="reciepts"
                        id="check6"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Steaming"
                        value="steaming"
                        id="check7"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Tagging"
                        value="tagging"
                        id="check8"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Final Examination"
                        value="finalexam"
                        id="check9"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Metal Detection"
                        value="metaldetect"
                        id="check10"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Boxing"
                        value="boxing"
                        id="check11"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  )}
                </Form>
              </div>
            ) : (
              <p>loading</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div style={{ textAlign: "center" }}>
          <h5 className="form-title">ITEMS</h5>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px 30px 20px 30px",
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
            style={{ height: "100% !important" }}
            data={data}
            sortable={true}
            // exportToCSV
          />
          {csvdata.length ? (
            <CSVLink data={csvdata} filename={"items_data.csv"}>
              Export CSV
            </CSVLink>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ViewItems
