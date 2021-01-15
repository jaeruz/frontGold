import React,{useEffect} from 'react'
import {Button,Table,Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPurchaseDetails } from '../../../../actions/BarcodeScanActions'


function ViewBarcodes() {
    const dispatch = useDispatch()
    const barcodeScanResult = useSelector(state => state.barcodeScanResult)

    useEffect(() => {
        dispatch(fetchPurchaseDetails())
    }, [])

    useEffect(() => {
        console.log(barcodeScanResult)
    }, [barcodeScanResult])
    return (
        <div className="view-item-container">
            <div style={{textAlign:"center"}}>
                <h3 className="form-title">BARCODES</h3>
            </div>
            <Form>
                <Form.Group>
                    <Form.Label style={{color:'white'}}>SEARCH:</Form.Label>
                    <Form.Control type='text' className="isr-form"/>
                </Form.Group>
            </Form>
            <div className="view-item-container-form">
                <Table striped bordered hover style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>BARCODE</th>
                            <th>STYLE</th>
                            <th>PO NO.</th>
                            <th>COLOR</th>
                            <th>SIZE</th>
                            <th>QTY/SACK</th>
                            <th>SACK NO.</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {barcodeScanResult.length ? barcodeScanResult.map(((i,index) => {
                            return (
                                <tr key={index}>
                                    <td>{i.create_on}</td>
                                    <td>{i.barcode.toUpperCase()}</td>
                                    <td>{i.po_number.detail_style.style}</td>
                                    <td>{i.po_number.po_number.toUpperCase()}</td>
                                    <td>{i.po_number.color.toUpperCase()}</td>
                                    <td>{i.po_number.size.toUpperCase()}</td>
                                    <td>{i.po_number.qty_sack}</td>
                                    <td>{i.barcode.split('-')[3]}</td>
                                    <td></td>
                                    {/* <td><Button variant="danger">DELETE</Button></td> */}
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

export default ViewBarcodes
