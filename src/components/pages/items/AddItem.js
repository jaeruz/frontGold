import React,{useEffect, useState} from 'react'
import { Form, Container, Row, Col, Button,Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addItem } from '../../../actions/ItemActions'
import Gears from '../../../assets/img/gears.gif'

function AddItem() {

    const dispatch = useDispatch()

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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addItem(ItemClass))
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
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="customer" >
                    <Form.Label>Customer:</Form.Label>
                    <Form.Control type="text" placeholder="Customer" onChange={handleFormChange}/>
                </Form.Group>
                <Form.Group controlId="style">
                    <Form.Label>Style:</Form.Label>
                    <Form.Control type="text" placeholder="Style" onChange={handleFormChange}/>
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
                                label="Sewing"
                                value="sewing"
                                onChange={handleChange}
                            />
                            <Form.Check
                                label="Final Examination"
                                value="finalexam"
                                onChange={handleChange}
                            />
                            <Form.Check
                                label="Receiving"
                                value="Receiving"
                                onChange={handleChange}
                            />
                            <Form.Check
                                label="Steaming"
                                value="Steaming"
                                onChange={handleChange}
                            />
                            <Form.Check
                                label="Tagging"
                                value="Tagging"
                                onChange={handleChange}
                            />
                            <Form.Check
                                label="Metal Detection"
                                value="Metal Detection"
                                onChange={handleChange}
                            />
                            <Form.Check
                                label="Boxing"
                                value="Boxing"
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
