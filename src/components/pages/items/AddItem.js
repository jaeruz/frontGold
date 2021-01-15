import React,{useEffect, useState} from 'react'
import { Form, Container, Row, Col, Button,Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addItem } from '../../../actions/ItemActions'
import Gears from '../../../assets/img/gears.gif'
import * as FaIcons from 'react-icons/fa'
import * as BiIcons from "react-icons/bi";

import { useAlert } from 'react-alert'

function AddItem() {

    const dispatch = useDispatch()
    const alert = useAlert()

    const [ItemClass, setItemClass] = useState({
        process: [],
        customer: '',
        style:''
    })

    useEffect(() => {
        console.log(ItemClass)
    }, [ItemClass])

    const handleFormChange = (e) => {
        setItemClass({
            ...ItemClass,
            [e.target.id]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
        if (checkboxes.length) {
            const res = await dispatch(addItem(ItemClass))
            console.log(res)
            if (res) {
                alert.show(
                    <div className="alert-suc"><FaIcons.FaCheck/> The Item has been added!</div>
                )
            } else {
                alert.show(
                    <div className="alert-err"><BiIcons.BiError/> Unable to add the Item!</div>
                )
            }
            document.getElementById('form-add-item').reset();
        } else {
            alert.show(
                    <div className="alert-err"><BiIcons.BiError/> No Selected Process!</div>
                )
        }
    }

    const handleChange = (e) => {
        
        let processList = []
        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
        for (let i = 0; i < checkboxes.length; i++){
            processList.push(checkboxes[i].value)
        }
        setItemClass({
            ...ItemClass,
            process: processList,
        })
    }

    return (
        <Container className="add-item-container">
            <div style={{textAlign:"center"}}>
                <h3 className="form-title">Add Item</h3>
            </div>
            <Form onSubmit={handleSubmit} id="form-add-item">
                <Form.Group controlId="customer" >
                    <Form.Label>Customer:</Form.Label>
                    <Form.Control required type="text" placeholder="Customer" className="form-caps" onChange={handleFormChange}/>
                </Form.Group>
                <Form.Group controlId="style">
                    <Form.Label>Style:</Form.Label>
                    <Form.Control required type="text" placeholder="Style" className="form-caps" onChange={handleFormChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Process:</Form.Label>
                    {/* <Form.Control type="text" placeholder="Customer name"/> */}
                    <Row style={{ marginLeft: "10%", marginRight: "10%", fontSize: "15px" }}>
                        <Col sm={1}></Col>
                        <Col sm={4}>
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
                                value="reciepts"
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
                                label="Final Examination"
                                value="finalexam"
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
                        </Col>
                        <Col sm={2}>
                        </Col>
                        <Col sm={5}>
                            <Image src={Gears} style={{width:'200px',margin:'10px !important',padding:'0 !important'}}/>
                            
                        </Col>
                        
                    </Row>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Button variant="info" type="submit" className="form-btn-dark" style={{float:"right"}}>
                        Add
                    </Button>
                    <Button variant="info" className="form-btn-light" style={{float:"right"}}>
                        Clear
                    </Button>
                </Form.Group>
               
            </Form>
        </Container>
    )
}

export default AddItem
