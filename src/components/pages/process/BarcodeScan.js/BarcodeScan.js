import React, { useState,useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import BarcodeScanPanel from './BarcodeScanPanel';
import BarcodeScanResult from './BarcodeScanResult';
import { useDispatch } from 'react-redux'
import { postBarcodeDetails } from '../../../../actions/BarcodeScanActions';

function BarcodeScan() {
    
    const dispatch = useDispatch()
    
    const [barcodeInput, setBarcodeInput] = useState({
        barcode:''
    })
    const [barcodeCopy, setBarcodeCopy] = useState({
        barcode:''
    })

    const handleSubmit = (e) => {
         e.preventDefault();
        let barcodeField = document.getElementById('barcodeInput')
        barcodeField.value = ''
        const undbtn = document.getElementById('undo-btn')
        undbtn.disabled = true;
        //dispatch
        setBarcodeCopy(barcodeInput)
        dispatch(postBarcodeDetails(barcodeInput))
    }
   
    useEffect(() => {
            const undbtn = document.getElementById('undo-btn')
            undbtn.disabled = true;
    }, [])

    useEffect(() => {
        if (barcodeCopy.barcode !== "") {
            const undbtn = document.getElementById('undo-btn')
            undbtn.disabled = false;
        }
        
    }, [barcodeCopy])
    return (
        <div className="barcode-scan-container">
            <Row>
                 <Col xl={4} lg={4} md={10} sm={10}>
                    <BarcodeScanPanel
                        handleSubmit={handleSubmit}
                        setBarcodeInput={setBarcodeInput} 
                        barcodeCopy={barcodeCopy}
                        />
                </Col>
                <Col xl={7} lg={7} md={10} sm={10}>         
                    <BarcodeScanResult
                        barcodeCopy={barcodeCopy}
                    />
                </Col>
                <Col xl={1}></Col>
            </Row>
        </div>
    )
}

export default BarcodeScan
