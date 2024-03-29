import React, { useState, useEffect } from "react"
import {
  Table,
  Col,
  Row,
  Button,
  Form,
  Card,
  ButtonGroup,
} from "react-bootstrap"
import POPrintComponent from "./POPrintComponent"
import POTable from "./POTable"
import { useDispatch, useSelector } from "react-redux"
import { fetchDetails } from "../../../../actions/DetailsActions"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

function PO({ setSidebar, sidebar }) {
  const [searchInput, setSearchInput] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  const [selectedPO, setSelectedPO] = useState(null)
  const [routeList, setRouteList] = useState([])
  const [generatedBarcode, setGeneratedBarcode] = useState(null)
  const [dummyState, setDummyState] = useState(false)

  const dispatch = useDispatch()
  const details = useSelector((state) => state.details)

  useEffect(() => {
    dispatch(fetchDetails())
  }, [dummyState])

  useEffect(() => {
    if (selectedPO) {
      if (selectedPO.length) {
        selectedPO[0].detail_style.process.unshift("ISR")
        let uniqueFilteredRoute = [
          ...new Set(selectedPO[0].detail_style.process),
        ]
        setRouteList(uniqueFilteredRoute)
      }
    }
  }, [selectedPO])

  useEffect(() => {
    const resultfilt = details.filter((det) => det.active === true)
    setSearchResult(resultfilt)
  }, [details])

  useEffect(() => {
    if (details) {
      if (details.length) {
        const searchResult = details.filter(
          (det) =>
            (det.po_number.includes(searchInput) ||
              det.detail_customer.toUpperCase().includes(searchInput)) &&
            det.active === true
        )
        setSearchResult(searchResult)
      }
    }
  }, [searchInput])

  const handlePrint = () => {
    const input = document.getElementById("printForm")

    html2canvas(input, {
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "px", "a4")
      let pageWidth = pdf.internal.pageSize.getWidth()
      let pageHeight = pdf.internal.pageSize.getHeight()

      const widthRatio = pageWidth / canvas.width
      const heightRatio = pageHeight / canvas.height

      const canvasWidth = canvas.width * widthRatio
      const canvasHeight = canvas.height * heightRatio

      const marginX = (pageWidth - canvasWidth) / 2
      const marginY = (pageHeight - canvasHeight + 50) / 2

      pdf.addImage(
        imgData,
        "JPEG",
        marginX,
        marginY,
        canvasWidth,
        canvasHeight + 250
      )
      pdf.save(generatedBarcode)
    })
  }

  return (
    <div className="po-wrapper">
      <div className="po-container">
        <Row>
          <Col lg={6} md={11} sm={11}>
            <POTable
              generatedBarcode={generatedBarcode}
              setGeneratedBarcode={setGeneratedBarcode}
              handlePrint={handlePrint}
              searchResult={searchResult}
              details={details}
              selectedPO={selectedPO}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setSelectedPO={setSelectedPO}
              dummyState={dummyState}
              setDummyState={setDummyState}
              setSidebar={setSidebar}
              sidebar={sidebar}
            />
          </Col>
          <Col lg={6} md={11} sm={11}>
            <POPrintComponent
              generatedBarcode={generatedBarcode}
              routeList={routeList}
              selectedPO={selectedPO}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default PO
