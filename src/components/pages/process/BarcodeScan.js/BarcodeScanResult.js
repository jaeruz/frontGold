import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import {Row} from 'react-bootstrap'

function BarcodeScanResult({barcodeCopy}) {

    const barcodeScanResult = useSelector(state => state.barcodeScanResult)

    
    useEffect(() => {
        console.log(barcodeScanResult)
        console.log(barcodeScanResult.length)
    }, [barcodeScanResult])
    return (
        <div className="barcode-scan-result">
            <h4 className="form-title" style={{ textAlign: 'center' }}>Result</h4>
            <br />
            <br />
            
            {barcodeScanResult.length && barcodeCopy.barcode ? (
                <div className="details-result">
                    <p><span>{barcodeCopy.barcode}</span></p>
                    <h2>PO Number:<span>{barcodeCopy.barcode.split('-')[1]}</span></h2>
                    <h2>STYLE:<span>{barcodeCopy.barcode.split('-')[0]}</span></h2>
                    <h2>COLOR:<span>{barcodeCopy.barcode.split('-')[2]}</span></h2>
                    <h2>SACK #:<span>{barcodeCopy.barcode.split('-')[3]}</span></h2>
                    <h2>CURRENT PROCESS:<span>{barcodeScanResult.split(',')[0]}</span></h2>
                    <h2>NEXT PROCESS:<span>{barcodeScanResult.split(',')[1]}</span></h2>
                        
                    </div>
                ): <p>No Result</p>}
        </div>
    )
}

export default BarcodeScanResult
