import React, { useEffect } from 'react'
import {Container,Table,Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from '../../../actions/ItemActions'

function ViewItems() {
    
    const dispatch = useDispatch()
    const item = useSelector(state => state.item)

    useEffect(() => {
        dispatch(getItems())
    }, [])

    useEffect(() => {
        console.log(item)
    }, [item])
    return (
        <div className="view-item-container">
            <div style={{textAlign:"center"}}>
                <h3 className="form-title">ITEMS</h3>
            </div>
            <Form>
                <Form.Group>
                    <Form.Label style={{color:'white'}}>SEARCH:</Form.Label>
                    <Form.Control type='text' className="isr-form"/>
                </Form.Group>
            </Form>
            <div className="po-container-table">
                <Table striped bordered hover style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>CUSTOMER</th>
                            <th>STYLE</th>
                            <th>PROCESS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.length ? item.map((i => {
                            return (
                                <tr>
                                    <td>1/12/1223</td>
                                    <td>{i.customer.toUpperCase()}</td>
                                    <td>{i.style.toUpperCase()}</td>
                                    <td>{i.process.map((p)=>{return((p+', ').toUpperCase())})}</td>
                                </tr>
                            )
                        })): (
                            <tr>
                                <td colSpan="4" style={{textAlign:'center'}}>No Result</td>
                            </tr>)
                        }
                        
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ViewItems
