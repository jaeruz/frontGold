import React, {useEffect, useState} from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useBarcode } from '@createnextapp/react-barcode';


function ISRPrintComponent({ ISRItem }) {
    const [bar, setBar] = useState('null')

    let {inputRef}  = useBarcode({
        value: bar ? bar:'null',
        options: {
            background: '#ffffff',
            width: 1,
            height: 40,
            fontSize: 13
        }
    });

    useEffect(() => {
        setBar(ISRItem.barcode)
    }, [ISRItem.barcode,ISRItem.detail_customer])

    return ( 
        <Container className="print-form">
            <p className="print-form-title">GOLDEN ZONE GARMENTS AND ACCESSORIES,INC ROUTE SHEET</p>
            <Row>
                <Col sm={6} className="print-form-details">
                    <ul>
                        <li>CUSTOMER: {ISRItem.detail_customer}</li>
                        <li>PO #: { ISRItem.po_number}</li>
                        <li>STYLE: { ISRItem.barcode.split('-',1)}</li>
                        <li>DESCRIPTION: { ISRItem.description}</li>
                        <li>COLOR: {ISRItem.color}</li>
                        <li>TOTAL Q'TY: { ISRItem.total}</li>
                        <li>Q'TY/SACK: { ISRItem.qty_sack}</li>
                        <li>SHIPDATE: {ISRItem.ship_date}</li>
                        
                    </ul>
                </Col>
                <Col sm={4}>
                    <div className="print-sack-number">
                        <h5>SACK NO.</h5>
                        <h6>{ ISRItem.sack_number}</h6>
                    </div>
                </Col>
            </Row>
            <div style={{padding:"50px"}}></div>
            <div className="print-barcode">
                <Image ref={inputRef} />
            </div>
        </Container>
     );
}

export default ISRPrintComponent
