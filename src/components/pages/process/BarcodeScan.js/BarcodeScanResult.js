import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import {Row} from 'react-bootstrap'

function BarcodeScanResult() {

    const barcodeScanResult = useSelector(state => state.barcodeScanResult)

    useEffect(() => {
        console.log(barcodeScanResult)
    }, [barcodeScanResult])
    return (
        <div className="barcode-scan-result">
            <h4 className="form-title" style={{ textAlign: 'center' }}>Result</h4>
            <br />
            {barcodeScanResult ? (
                    <>
                        {/* <p>{barcodeScanResult.barcode}</p> */}
                    <h2>{barcodeScanResult}</h2>
                        
                    </>
                ): <p>No Result</p>}
        </div>
    )
}

export default BarcodeScanResult
