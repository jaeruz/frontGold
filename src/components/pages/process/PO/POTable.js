import React,{useEffect,useState} from 'react'
import { Table, Col, Row, Button, Form, Card, ButtonGroup } from 'react-bootstrap'
import { fetchPurchase, addPurchase } from '../../../../api'
import Moment from 'react-moment';
import 'moment-timezone';
import * as FaIcons from 'react-icons/fa'
import * as BiIcons from "react-icons/bi";

import { useAlert } from 'react-alert'
import axios from 'axios';

function POPrintComponent({setSearchInput,setSelectedPO,details,selectedPO,searchResult,handlePrint,setGeneratedBarcode,generatedBarcode}) {


    const alert = useAlert()

    const handleChange = (e) => {
        setSearchInput(e.target.value.toUpperCase())
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleProcess = async () => {
        
        const res = await addPurchase(purchaseToSubmit)
        console.log(res)
        if (res!==null) {
            alert.show(
                <div className="alert-suc"><FaIcons.FaCheck /> { generatedBarcode } is on-process! </div>
            )
        } else {
            alert.show(
                <div className="alert-err"><BiIcons.BiError/> Unable to process {generatedBarcode}!</div>
            )
        }
        //update
        console.log(generatedBarcode.split('-')[3])
        console.log(selectedPO[0].total_sack)
        if (generatedBarcode.split('-')[3].toString() === selectedPO[0].total_sack.toString()) {
           await axios.post("http://localhost:8000/api/detail-update/" + selectedPO[0].id, {'active':'false'}, {
                headers: {
                    'Authorization': 'token '+ JSON.parse(window.localStorage.getItem("credentials")).token
                }
            }) 
        }
        
        console.log(selectedPO[0].id)
        setDummyState(!dummyState)
        handlePrint();
        setSelectedPO(null)
    }

    const [purchaseResult, setpurchaseResult] = useState(null)
    const [filteredPurchaseResult, setfilteredPurchaseResult] = useState(null)
    const [purchaseActive, setPurchaseActive] = useState([])
    const [dummyState, setDummyState] = useState(false)
    const [purchaseToSubmit, setpurchaseToSubmit] = useState(null)

    useEffect(() => {
        setDummyState(!dummyState)
    }, [])

    useEffect(async() => {
        let flag = true;
        if (flag) {
            const purchaseResult = await fetchPurchase()
            
            setpurchaseResult(purchaseResult.data)
        }
        return () => {
            flag=false
        }
    }, [dummyState])

    

    useEffect(() => {
        if (purchaseResult && searchResult) {
            if (searchResult.length) {
                let purchaseResActive =[]
                for (let j = 0; j != searchResult.length; j++){
                    let ctr = 0;
                    for (let i = 0; i != purchaseResult.length; i++){
                        if (purchaseResult[i].po_number.po_number === searchResult[j].po_number && purchaseResult[i].po_number.color === searchResult[j].color && purchaseResult[i].po_number.detail_style.style === searchResult[j].detail_style.style) { 
                            ctr++;
                        }
                    }
                    purchaseResActive.push(ctr)
                }
                
                setPurchaseActive(purchaseResActive)
            
            }
        }
        
    }, [purchaseResult, searchResult])
    

    useEffect(() => {
        
        if (filteredPurchaseResult && selectedPO) {
            if (selectedPO.length) {
                setpurchaseToSubmit({
                    po_number: selectedPO[0].id,
                    barcode: generatedBarcode,
                    sack_number: filteredPurchaseResult.length+1
                })
            }
        }
    }, [generatedBarcode,selectedPO,filteredPurchaseResult])

    const handleSelect = (po,color,style,index) => {
        let selectedDetails = details.filter((det) => { return det.po_number === po && det.color === color })
        
        // const purchaseResult = await fetchPurchase()
        let filterPurchase = purchaseResult.filter((pr) => { return pr.po_number.po_number === po && pr.po_number.color === color && pr.po_number.detail_style.style === style })
        setfilteredPurchaseResult(filterPurchase)
        let genCode = selectedDetails[0].detail_style.style + '-' + selectedDetails[0].po_number + '-' + selectedDetails[0].color + '-' + (filterPurchase.length+1)
        setGeneratedBarcode(genCode);
        setSelectedPO(selectedDetails)
    }

    return (
        <div className="po-container-form">
            <div style={{ marginBottom: "15px" }}>
                <h3 className="form-title">PURCHASE ORDERS</h3> 
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label style={{color:'white'}}>SEARCH:</Form.Label>
                    <Form.Control type='text' className="isr-form" onChange={handleChange}/>
                </Form.Group>
            </Form>
            <div className="po-container-table">
                <Table striped bordered hover style={{backgroundColor:'white', borderRadius:'10px'}}>
                    <thead>
                        <tr>
                            <th>DATE CREATED</th>
                            <th>PO</th>
                            <th>COLOR</th>
                            <th>TOTAL SACK</th>
                            <th>PENDING</th>
                            <th>ACTIVE</th>
                            <th>SELECT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult && purchaseActive.length && searchResult.length ? searchResult.map((det, index) => {
                            return(
                                <tr style={{fontSize:'15px'}} key={index}>
                                    <td><Moment format="YYYY-MM-DD hh:mm:ss">{ det.create_on }</Moment></td>
                                    <td>{det.po_number}</td>
                                    <td>{ det.color }</td>
                                    <td>{det.total_sack}</td>
                                    <td>{det.total_sack - purchaseActive[index]}</td>
                                    <td>{purchaseActive[index]}</td>
                                    <td><Button onClick={()=>handleSelect(det.po_number,det.color,det.detail_style.style,index)}>SELECT</Button></td>
                                </tr>
                            )
                        }) : (
                                <tr>
                                    <td colSpan="7" style={{textAlign:'center'}}>No Result</td>
                                </tr>
                        )}
                        

                    </tbody>
                </Table>
            </div>
            <br/>
            <Card>
                <Card.Body as={Row}>
                    {selectedPO && purchaseToSubmit ? (
                        <>
                            <Col sm={9}>
                            <Card.Title>{selectedPO[0].po_number}</Card.Title>
                            <Card.Text>CUSTOMER: {selectedPO[0].detail_customer}</Card.Text>
                            </Col>
                            <Col sm={2}>
                            <Button variant="primary" style={{padding:'20px 20px 20px 20px'}} onClick={handleProcess}>PROCESS 1 SACK</Button>
                            </Col>
                        </>
                    ) : (
                            <p style={{margin:'21px'}}>Select PO</p>
                    )}
                    
                </Card.Body>
            </Card>
        </div>
    )
}

export default POPrintComponent

