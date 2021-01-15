import React,{useEffect,useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import FocusLock from 'react-focus-lock';
import { undoScan } from '../../../../api';
import { useAlert } from 'react-alert'
import * as FaIcons from 'react-icons/fa'
import * as BiIcons from "react-icons/bi";

function BarcodeScanPanel({ setBarcodeInput,handleSubmit,barcodeCopy,barcodeInput,setBarcodeCopy }) {


    const alert = useAlert()

    const handleChange = (e) => {
        setTimeout(() => {
            if (document.getElementById("barcodeInput") !== null) {
                if (document.getElementById("barcodeInput").value !== "") {
                    document.getElementById("barcodeInput").value = ""
                }
                // setBarcodeCopy({
                //     barcode: ""
                // })
                // const undbtn = document.getElementById('undo-btn')
                // undbtn.disabled = true;
            }
        }, 10000);
        
        
        setBarcodeInput({
            barcode: e.target.value
        })
        
    }
    useEffect(() => {
        console.log(barcodeInput)
    }, [barcodeInput])


    const handleUndo = async () => {
        if (barcodeCopy.barcode !== null) {
            const res = await undoScan(barcodeCopy)
            console.log(res)
            if (res.data.includes("Undo")) {
                alert.show(
                    <div className="alert-suc"><FaIcons.FaCheck /> {'"'+res.data+'"'+' process complete!'}</div>
                )
            } else {
                alert.show(
                    <div className="alert-suc"><FaIcons.FaCheck /> Undo Error! ask admin for help.</div>
                )
            }
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
