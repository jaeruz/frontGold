import React, { useEffect, useState } from "react"
import { Form, Container, Row, Col, Button, Image } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addItem } from "../../../actions/ItemActions"
import Gears from "../../../assets/img/gir2.png"
import * as FaIcons from "react-icons/fa"
import * as BiIcons from "react-icons/bi"

import { useAlert } from "react-alert"

function AddItem({ isMain }) {
  const dispatch = useDispatch()
  const alert = useAlert()

  const [ItemClass, setItemClass] = useState({
    process: [],
    customer: "",
    style: "",
  })

  useEffect(() => {
    console.log(ItemClass)
  }, [ItemClass])

  const handleFormChange = (e) => {
    setItemClass({
      ...ItemClass,
      [e.target.id]: e.target.value.toUpperCase(),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let checkboxes = document.querySelectorAll("input[type=checkbox]:checked")
    if (checkboxes.length) {
      const res = await dispatch(addItem(ItemClass))
      console.log(res)
      if (res) {
        alert.show(
          <div className="alert-suc">
            <FaIcons.FaCheck /> The Item has been added!
          </div>
        )
      } else {
        alert.show(
          <div className="alert-err">
            <BiIcons.BiError /> Unable to add the Item!
          </div>
        )
      }
      document.getElementById("form-add-item").reset()
    } else {
      alert.show(
        <div className="alert-err">
          <BiIcons.BiError /> No Selected Process!
        </div>
      )
    }
  }

  const handleClear = () => {
    document.getElementById("form-add-item").reset()
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

  return (
    <div className="add-item-wrapper">
      <div className="add-item-container">
        <div style={{ textAlign: "center" }}>
          <h5 className="form-title">ADD ITEM</h5>
        </div>

        <div className="add-item-primary">
          <Form onSubmit={handleSubmit} id="form-add-item">
            <Row>
              <Col lg={1}></Col>
              <Col lg={5}>
                <Form.Group controlId="customer">
                  <Form.Label>Customer:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Customer"
                    className="form-caps"
                    onChange={handleFormChange}
                  />
                </Form.Group>
                <Form.Group controlId="style">
                  <Form.Label>Style:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Style"
                    className="form-caps"
                    onChange={handleFormChange}
                  />
                </Form.Group>
                <br />
                <Image
                  src={Gears}
                  style={{
                    width: "200px",
                    marginLeft: "90px",
                    height: "170px",
                  }}
                />
              </Col>
              <Col lg={1}></Col>
              <Col lg={5}>
                {ItemClass.customer.toUpperCase() === "TOTES" ? (
                  isMain ? (
                    <Form.Group>
                      <Form.Label>Process:</Form.Label>
                      <Form.Check
                        label="B1 Receipts"
                        value="receipts"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Steaming"
                        value="steaming"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Examining"
                        value="examining"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Steaming 1"
                        value="steaming_1"
                        onChange={handleChange}
                      />

                      <Form.Check
                        label="Examining 1"
                        value="examining_1"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Tagging"
                        value="tagging"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Metal Detection"
                        value="metaldetect"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Boxing"
                        value="boxing"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ) : (
                    <Form.Group>
                      <Form.Label>Process:</Form.Label>

                      <Form.Check
                        label="Knitting"
                        value="knitting"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="ISR 1"
                        value="isr_1"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="B1 Receipts"
                        value="receipts"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Steaming"
                        value="steaming"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Examining"
                        value="examining"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="ISR 2"
                        value="isr_2"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Sewing"
                        value="sewing"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="ISR 3"
                        value="isr_3"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Steaming 1"
                        value="steaming_1"
                        onChange={handleChange}
                      />

                      <Form.Check
                        label="Examining 1"
                        value="examining_1"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Tagging"
                        value="tagging"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Metal Detection"
                        value="metaldetect"
                        onChange={handleChange}
                      />
                      <Form.Check
                        label="Boxing"
                        value="boxing"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  )
                ) : isMain ? (
                  <Form.Group>
                    <Form.Label>Process:</Form.Label>
                    <Form.Check
                      label="B1 Receipts"
                      value="receipts"
                      onChange={handleChange}
                    />
                    <Form.Check
                      label="Steaming"
                      value="steaming"
                      onChange={handleChange}
                    />
                    <Form.Check
                      label="Tagging"
                      value="tagging"
                      onChange={handleChange}
                    />
                    <Form.Check
                      label="Examining"
                      value="examining"
                      onChange={handleChange}
                    />

                    <Form.Check
                      label="Metal Detection"
                      value="metaldetect"
                      onChange={handleChange}
                    />
                    <Form.Check
                      label="Boxing"
                      value="boxing"
                      onChange={handleChange}
                    />
                  </Form.Group>
                ) : (
                  <Form.Group>
                    <Form.Label>Process:</Form.Label>
                    <Form.Check
                      label="Knitting"
                      value="knitting"
                      onChange={handleChange}
                    />
                    <Form.Check
                      label="Cutting"
                      value="cutting"
                      onChange={handleChange}
                    />
                    <Form.Check
                      label="ISR 1"
                      value="isr_1"
                      onChange={handleChange}
                    />
                    <Form.Check
                      label="Sewing"
                      value="sewing"
                      onChange={handleChange}
                    />
                    <Form.Check
                      label="ISR 2"
                      value="isr_2"
                      onChange={handleChange}
                    />

                    <Form.Check
                      label="B1 Receipts"
                      value="receipts"
                      onChange={handleChange}
                    />
                    <Form.Check
                      label="Steaming"
                      value="steaming"
                      onChange={handleChange}
                    />
                    <Form.Check
                      label="Tagging"
                      value="tagging"
                      onChange={handleChange}
                    />
                    <Form.Check
                      label="Examining"
                      value="examining"
                      onChange={handleChange}
                    />

                    <Form.Check
                      label="Metal Detection"
                      value="metaldetect"
                      onChange={handleChange}
                    />
                    <Form.Check
                      label="Boxing"
                      value="boxing"
                      onChange={handleChange}
                    />
                  </Form.Group>
                )}
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col lg={1}></Col>
              <Col lg={10}>
                <Form.Group>
                  <Button
                    variant="info"
                    type="submit"
                    className="form-btn-dark"
                    size="sm"
                    block
                  >
                    Add
                  </Button>

                  <Button
                    variant="info"
                    className="form-btn-dark"
                    block
                    size="sm"
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                </Form.Group>
              </Col>
              <Col lg={1}></Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default AddItem
