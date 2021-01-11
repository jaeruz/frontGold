import React from 'react'
import { Form, Button } from 'react-bootstrap'
import FocusLock from 'react-focus-lock';
import { undoScan } from '../../../../api';


function BarcodeScanPanel({ setBarcodeInput,handleSubmit,barcodeCopy }) {

    const handleChange = (e) => {
        setBarcodeInput({
            barcode: e.target.value
        })
        
    }


    const handleUndo = async () => {
        if (barcodeCopy.barcode !== null) {
            const res = await undoScan(barcodeCopy)
            console.log(res)
        }
    }

    return (
        <div className="barcode-scan-panel">
            <h4 className="form-title" style={{textAlign:'center'}}>Barcode Scan</h4>
            <br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="barcodeInput">
                    <Form.Label>Scan:</Form.Label>
                    <FocusLock>
                        <Form.Control type="text" placeholder="Scan here" onChange={handleChange}/>
                    </FocusLock>
                </Form.Group>
            </Form>
            <br/>
            <Button variant="danger" className="btn-undo" block id="undo-btn" onClick={handleUndo}>UNDO SCAN</Button>
            <hr />
            <h5>Instructions</h5>
            <p>1. Make sure the cursor is focused on the text box</p>
            <p>2. Scan the barcode located at the bottom of the route sheet</p>
            <h5>Reminder</h5>
            <p>* Scanning should be done once for each sack on each process *</p>
        </div>
    )
}

export default BarcodeScanPanel
