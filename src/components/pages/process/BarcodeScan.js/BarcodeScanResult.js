import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import {Row} from 'react-bootstrap'

function BarcodeScanResult() {

    const barcodeScanResult = useSelector(state => state.barcodeScanResult)

    return (
        <div className="barcode-scan-result">
            <h4 className="form-title" style={{ textAlign: 'center' }}>Result</h4>
            <br />
            {barcodeScanResult && barcodeScanResult.detail_style ? (
                    <>
                        <p>{barcodeScanResult.barcode}</p>
                        <p>{barcodeScanResult.color}</p>
                        <p>{barcodeScanResult.description}</p>
                        <p>{barcodeScanResult.detail_customer}</p>
                        <p>{barcodeScanResult.detail_style.style}</p>
                        <p>{barcodeScanResult.po_number}</p>
                        <p>{barcodeScanResult.qty_sack}</p>
                        <p>{barcodeScanResult.ship_date}</p>
                    </>
                ): <p>No Result</p>}
        </div>
    )
}

export default BarcodeScanResult
