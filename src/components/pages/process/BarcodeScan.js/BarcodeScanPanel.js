import React from 'react'
import { Form, Button } from 'react-bootstrap'
import FocusLock from 'react-focus-lock';

function BarcodeScanPanel({ setBarcodeInput,handleSubmit }) {

    const handleChange = (e) => {
        setBarcodeInput({
            barcode: e.target.value
        })
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
            <Button variant="danger" className="btn-undo" block disabled>UNDO SCAN</Button>
            <hr />
            <h5>Instructions</h5>
            <p>1.Lorem ipsum dolor sit amet sit amet sit</p>
            <p>2.Lorem ipsum dolor sit amet sit amet sit</p>
            <p>3.Lorem ipsum dolor sit amet sit amet sit</p>
            <p>4.Lorem ipsum dolor sit amet sit amet sit</p>
        </div>
    )
}

export default BarcodeScanPanel
