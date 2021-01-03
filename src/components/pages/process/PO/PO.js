import React from 'react'
import { Table, Col, Row, Button, Form, Card, ButtonGroup } from 'react-bootstrap'

function PO() {
    return (
        <div className="isr-container"> 
            <Row>
                <Col lg={6} md={11} sm={11}>
                    <div className="po-container-form">
                        <div style={{ marginBottom: "15px" }}>
                            <h3 className="form-title">PURCHASE ORDERS</h3> 
                        </div>
                        <Form>
                            <Form.Group>
                                <Form.Label style={{color:'white'}}>SEARCH</Form.Label>
                                <Form.Control type='text'/>
                            </Form.Group>
                        </Form>
                        <div className="po-container-table">
                            <Table striped bordered hover style={{backgroundColor:'white', borderRadius:'10px'}}>
                                <thead>
                                    <tr>
                                        <th>PO</th>
                                        <th>TOTAL SACK</th>
                                        <th>PENDING</th>
                                        <th>ACTIVE</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>18455</td>
                                        <td>100</td>
                                        <td>98</td>
                                        <td>2</td>
                                        <td><Button>SELECT</Button></td>
                                    </tr>
                                    <tr>
                                        <td>123355</td>
                                        <td>100</td>
                                        <td>70</td>
                                        <td>30</td>
                                        <td><Button>SELECT</Button></td>
                                    </tr>
                                    <tr>
                                        <td>196755</td>
                                        <td>50</td>
                                        <td>45</td>
                                        <td>5</td>
                                        <td><Button>SELECT</Button></td>
                                    </tr>
                                    <tr>
                                        <td>122255</td>
                                        <td>100</td>
                                        <td>98</td>
                                        <td>2</td>
                                        <td><Button>SELECT</Button></td>
                                    </tr>
                                    <tr>
                                        <td>11795</td>
                                        <td>100</td>
                                        <td>98</td>
                                        <td>2</td>
                                        <td><Button>SELECT</Button></td>
                                    </tr>
                                    <tr>
                                        <td>112255</td>
                                        <td>100</td>
                                        <td>98</td>
                                        <td>2</td>
                                        <td><Button>SELECT</Button></td>
                                    </tr>
                                    <tr>
                                        <td>112255</td>
                                        <td>100</td>
                                        <td>98</td>
                                        <td>2</td>
                                        <td><Button>SELECT</Button></td>
                                    </tr>
                                    <tr>
                                        <td>112255</td>
                                        <td>100</td>
                                        <td>98</td>
                                        <td>2</td>
                                        <td><Button>SELECT</Button></td>
                                    </tr>
                                    <tr>
                                        <td>112255</td>
                                        <td>100</td>
                                        <td>98</td>
                                        <td>2</td>
                                        <td><Button>SELECT</Button></td>
                                    </tr>
                                    <tr>
                                        <td>112255</td>
                                        <td>100</td>
                                        <td>98</td>
                                        <td>2</td>
                                        <td><Button>SELECT</Button></td>
                                    </tr>
                                    
                                </tbody>
                            </Table>
                        </div>
                        <br/>
                        <Card>
                            <Card.Body as={Row}>
                                <Col sm={9}>
                                    <Card.Title>112255</Card.Title>
                                    <Card.Text>CUSTOMER: JET</Card.Text>
                                </Col>
                                <Col sm={2}>
                                    <Button variant="primary" style={{padding:'20px 30px 20px 30px'}}>PRINT</Button>
                                </Col>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
                <Col lg={6} md={11} sm={11}>
                    <div className="po-container-print">
                        <h4>PO table</h4>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default PO
