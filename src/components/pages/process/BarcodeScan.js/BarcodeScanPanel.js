import React, { useEffect, useState } from "react"
import { Form, Button, Modal, Image, Row, Col } from "react-bootstrap"
import FocusLock from "react-focus-lock"
import { undoScan } from "../../../../api"
import { useAlert } from "react-alert"
import * as FaIcons from "react-icons/fa"
import { useDispatch } from "react-redux"
import { clearResults, insertBR } from "../../../../actions/BarcodeScanActions"

function BarcodeScanPanel({
  setBarcodeInput,
  handleSubmit,

  barcodeInput,
}) {
  const dispatch = useDispatch()
  const alert = useAlert()

  //modal
  const [showw, setShoww] = useState(false)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [barcodeUndo, setBarcodeUndo] = useState(null)
  //modal

  const handleChangeUndo = (e) => {
    setBarcodeUndo({
      barcode: e.target.value,
    })
  }

  const handleChange = (e) => {
    setTimeout(() => {
      if (document.getElementById("barcodeInput") !== null) {
        if (document.getElementById("barcodeInput").value !== "") {
          document.getElementById("barcodeInput").value = ""
        }
      }
    }, 10000)
    setBarcodeInput({
      barcode: e.target.value,
    })
  }

  const handleUndo = async () => {
    if (barcodeUndo.barcode !== null) {
      const res = await undoScan(barcodeUndo)
      if (res.data) {
        dispatch(insertBR(res.data))
        alert.show(
          <div className="alert-suc">
            <FaIcons.FaCheck /> {'"' + res.data + '"' + " process complete!"}
          </div>
        )
        setShoww(false)
        setBarcodeUndo(null)
      } else {
        alert.show(
          <div className="alert-err">
            <FaIcons.FaCheck /> Undo Error! ask admin for help.
          </div>
        )
      }
    }
  }

  return (
    <div className="barcode-scan-panel">
      <Modal
        show={showw}
        onHide={() => setShoww(false)}
        animation={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">
            <h6>Undo Scan</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "2em" }}>
          Are you sure you want to undo the process for "{" "}
          {barcodeUndo ? barcodeUndo.barcode : null} " ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setShoww(false)
              handleShow()
            }}
          >
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleUndo}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-md">
            <h6>Undo Scan</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "2em" }}>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group>
              <Form.Label>QR Code:</Form.Label>
              <FocusLock>
                <Form.Control type="text" onChange={handleChangeUndo} />
              </FocusLock>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (barcodeUndo) {
                setShoww(true)
                handleClose()
              }
            }}
          >
            Undo
          </Button>
        </Modal.Footer>
      </Modal>
      <h4 className="form-title" style={{ textAlign: "center" }}>
        QR Code Scan
      </h4>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="barcodeInput">
          <Form.Label>Scan:</Form.Label>
          <FocusLock>
            <Form.Control
              type="text"
              placeholder="Scan here"
              onChange={handleChange}
            />
          </FocusLock>
        </Form.Group>
      </Form>
      <br />

      <hr />
      <div className="qrcode-instructions">
        <h5>Instructions</h5>
        <p>1. Make sure the cursor is focused on the "Scan here" field</p>
        <p>2. Scan the barcode located at the bottom of the route sheet</p>
        <h5>Reminder</h5>
        <p>* Scanning should be done once for each sack on each process *</p>
      </div>

      <br />
      <hr />
      <br />
      <Button
        variant="danger"
        className="btn-undo"
        block
        size="sm"
        id="undo-btn"
        onClick={handleShow}
      >
        UNDO SCAN
      </Button>
      <Button
        variant="info"
        className="btn-undo"
        block
        size="sm"
        onClick={() => {
          dispatch(clearResults())
        }}
      >
        CLEAR RESULT
      </Button>
    </div>
  )
}

export default BarcodeScanPanel
