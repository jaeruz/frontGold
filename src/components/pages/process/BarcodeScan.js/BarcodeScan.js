import React, { useState, useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import BarcodeScanPanel from "./BarcodeScanPanel"
import BarcodeScanResult from "./BarcodeScanResult"
import { useDispatch } from "react-redux"
import {
  clearResults,
  postBarcodeDetails,
} from "../../../../actions/BarcodeScanActions"

function BarcodeScan() {
  const dispatch = useDispatch()

  const [barcodeInput, setBarcodeInput] = useState({
    barcode: "",
  })
  const [barcodeCopy, setBarcodeCopy] = useState({
    barcode: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    let barcodeField = document.getElementById("barcodeInput")
    barcodeField.value = ""
    //dispatch
    setBarcodeCopy(barcodeInput)
    dispatch(postBarcodeDetails(barcodeInput))
  }

  useEffect(() => {
    dispatch(clearResults())
  }, [])

  return (
    <div className="barcode-wrapper">
      <div className="barcode-scan-container">
        <div className="barcode-primary-div">
          <Row>
            <Col xl={5} lg={4} md={10} sm={10}>
              <BarcodeScanPanel
                barcodeInput={barcodeInput}
                handleSubmit={handleSubmit}
                setBarcodeInput={setBarcodeInput}
              />
            </Col>
            <Col xl={7} lg={7} md={10} sm={10} className="col-res">
              <BarcodeScanResult barcodeCopy={barcodeCopy} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default BarcodeScan
