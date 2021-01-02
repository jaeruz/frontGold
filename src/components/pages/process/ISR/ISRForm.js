import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { addDetails } from '../../../../actions/DetailsActions'
import { getItems } from '../../../../actions/ItemActions'

function ISRForm({ISRItem,setISRItem,handlePrint}) {
    
    const dispatch = useDispatch()
    const item = useSelector(state => state.item)
    const [detailStyle, setdetailStyle] = useState(null)

    useEffect(() => {
        if (item) {
            if (item.length) {
                let customerList = []
                for (let i = 0; i !== item.length; i++){
                    customerList.push(item[i].customer)
                }

                let UniqueCustomerList = [...new Set(customerList)]

                setdetailStyle({
                    ...detailStyle,
                    customerList: UniqueCustomerList
                })
            }
        }
    }, [item])

    useEffect(() => {
        dispatch(getItems())
    }, [])


    useEffect(() => {
        setdetailStyle({
            customerList:[],
            styleDict: [],
        })    
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addDetails(ISRItem))
    }

    const handleChange = (e) => {
        
        let customer = document.getElementById("detail_customer");
        let sackNum = document.getElementById('sack_number');
        let style = document.getElementById('detail_style');
        let poNum = document.getElementById('po_number');

        if (customer.value !== "NONE") {
            let filteredItem = item.filter(i => i.customer === customer.value)
            let styleDict = []
            
            for (let i = 0; i !== filteredItem.length; i++){
                styleDict.push({
                    id: filteredItem[i].id,
                    style: filteredItem[i].style
                })
                setdetailStyle({
                    ...detailStyle,
                    styleDict: styleDict
                })
            }
        } else {
            setdetailStyle({
                ...detailStyle,
                styleDict: [],
            })
        }
        
       
        if (sackNum.value !== "" && style.value !== "" && poNum.value !== "" && customer.value!=="NONE") {
            setISRItem({
                ...ISRItem,
                [e.target.id]: e.target.value.toUpperCase(),
                detail_style: style.value,
                barcode: (style.options[style.selectedIndex].innerHTML +"-"+ poNum.value +"-"+ sackNum.value).toUpperCase()
            })
            
        } else if (customer.value==="NONE") {
            setISRItem({
                ...ISRItem,
                barcode: '',
                detail_customer: '',
            })
         }else {
            setISRItem({
                ...ISRItem,
                [e.target.id]: e.target.value.toUpperCase(),
                detail_style: style.value,
            })
            
        } 
    }
    

    return (
        <>
            <div style={{marginBottom:"15px"}}>
                <h3 className="form-title">ISR</h3>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="detail_customer">
                    <Col sm="4">
                        <Form.Label>Customer:</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control as="select" onChange={handleChange} className="form-caps">
                            <option key={0} value="NONE">NONE</option>
                            {detailStyle ? detailStyle.customerList.map((customer,index) => {
                                return <option key={index}>{customer}</option>
                            }):null}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="detail_style">
                    <Col sm="4">
                        <Form.Label>Style:</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control as="select" onChange={handleChange} placeholder="Choose Customer" className="form-caps">
                            {detailStyle ? detailStyle.styleDict.map((style,index) => {
                                return <option key={index} value={style.id}>{style.style}</option>
                            }):null}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="po_number">
                    <Col sm="4">
                        <Form.Label>PO Number:</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control type="text" onChange={handleChange} className="form-caps"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="sack_number">
                    <Col sm="4">
                        <Form.Label>Sack Number:</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control type="text" onChange={handleChange} className="form-caps"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="description">
                    <Col sm="4">
                        <Form.Label>Description:</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control type="text" onChange={handleChange} className="form-caps"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="color">
                    <Col sm="4">
                        <Form.Label>Color:</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control type="text" onChange={handleChange} className="form-caps"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="total">
                    <Col sm="4">
                        <Form.Label>Total:</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control type="text" onChange={handleChange} className="form-caps"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="qty_sack">
                    <Col sm="4">
                        <Form.Label>Quantity / Sack:</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control type="text" onChange={handleChange} className="form-caps"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="ship_date">
                    <Col sm="4">
                        <Form.Label>Ship Date:</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control type="date" onChange={handleChange} className="form-caps"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="barcode">
                    <Col sm="4">
                        <Form.Label>Barcode:</Form.Label>
                    </Col>
                    <Col sm="8">
                        <Form.Control type="text" className="form-caps" disabled />
                    </Col>
                </Form.Group>
                <div>
                    <Button type="submit" className="form-btn-dark" style={{ float: 'right' }}>
                        Submit
                    </Button>
                    <Button className="form-btn-light" style={{ float: 'right' }} onClick={handlePrint}>
                        Print
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default ISRForm
