import React, { useEffect, useState } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addDetails } from "../../../../actions/DetailsActions"
import { getItems } from "../../../../actions/ItemActions"
import * as FaIcons from "react-icons/fa"
import * as BiIcons from "react-icons/bi"
import { useAlert } from "react-alert"

function ISRForm({ ISRItem, setISRItem, handlePrint }) {
  const dispatch = useDispatch()
  const alert = useAlert()
  const item = useSelector((state) => state.item)
  const [detailStyle, setdetailStyle] = useState(null)

  useEffect(() => {
    if (item) {
      if (item.length) {
        let customerList = []
        for (let i = 0; i !== item.length; i++) {
          customerList.push(item[i].customer)
        }

        let UniqueCustomerList = [...new Set(customerList)]

        setdetailStyle({
          ...detailStyle,
          customerList: UniqueCustomerList,
        })
      }
    }
  }, [item])

  useEffect(() => {
    dispatch(getItems())
  }, [])

  useEffect(() => {
    setdetailStyle({
      customerList: [],
      styleDict: [],
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await dispatch(addDetails(ISRItem))
    console.log(res)
    if (res) {
      alert.show(
        <div className="alert-suc">
          <FaIcons.FaCheck /> The PO has been created!
        </div>
      )
    } else {
      alert.show(
        <div className="alert-err">
          <BiIcons.BiError /> Unable to create PO!
        </div>
      )
    }
    document.getElementById("form-isr").reset()
  }

  const handleChange = (e) => {
    let customer = document.getElementById("detail_customer")
    let style = document.getElementById("detail_style")
    let poNum = document.getElementById("po_number")
    let total = document.getElementById("total")
    let qtySack = document.getElementById("qty_sack")
    let totalSack = document.getElementById("total_sack")

    if (customer.value !== "NONE") {
      let filteredItem = item.filter((i) => i.customer === customer.value)
      let styleDict = []

      for (let i = 0; i !== filteredItem.length; i++) {
        styleDict.push({
          id: filteredItem[i].id,
          style: filteredItem[i].style,
        })
        setdetailStyle({
          ...detailStyle,
          styleDict: styleDict,
        })
      }
    } else {
      setdetailStyle({
        ...detailStyle,
        styleDict: [],
      })
    }

    if (style.value !== "" && poNum.value !== "" && customer.value !== "NONE") {
      if (total.value !== "" && qtySack.value !== "") {
        if (total.value % qtySack.value !== 0) {
          totalSack.value = Math.trunc(total.value / qtySack.value) + 1
        } else {
          totalSack.value = total.value / qtySack.value
        }
      }
      setISRItem({
        ...ISRItem,
        [e.target.id]: e.target.value.toUpperCase(),
        detail_style: style.value,
        total_sack: totalSack.value,
      })
    } else if (customer.value === "NONE") {
      setISRItem({
        ...ISRItem,
        detail_customer: "",
      })
    } else {
      setISRItem({
        ...ISRItem,
        [e.target.id]: e.target.value.toUpperCase(),
        detail_style: style.value,
      })
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit} id="form-isr">
        <Form.Group as={Row} controlId="detail_customer">
          <Col sm="4">
            <Form.Label>Customer:</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control
              required
              as="select"
              onChange={handleChange}
              className="form-caps"
            >
              <option key={0} value="NONE">
                NONE
              </option>
              {detailStyle
                ? detailStyle.customerList.map((customer, index) => {
                    return <option key={index}>{customer}</option>
                  })
                : null}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="detail_style">
          <Col sm="4">
            <Form.Label>Style:</Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control
              required
              as="select"
              onChange={handleChange}
              placeholder="Choose Customer"
              className="form-caps"
            >
              {detailStyle
                ? detailStyle.styleDict.map((style, index) => {
                    return (
                      <option key={index} value={style.style}>
                        {style.style}
                      </option>
                    )
                  })
                : null}
            </Form.Control>
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
              maxLength="10"
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
              maxLength="40"
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
              maxLength="10"
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
              maxLength="10"
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
            />
          </Col>
        </Form.Group>
        <div>
          <Button type="submit" className="form-btn-dark" block>
            Submit
          </Button>
        </div>
      </Form>
    </>
  )
}

export default ISRForm
