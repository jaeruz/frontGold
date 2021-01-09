
import React, { useState, useEffect } from 'react'
import { Table, Col, Row, Button, Form, Card, ButtonGroup } from 'react-bootstrap'
import POPrintComponent from './POPrintComponent'
import POTable from './POTable'
import { useDispatch,useSelector } from 'react-redux'
import { fetchDetails } from '../../../../actions/DetailsActions'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

function PO() {

    const [searchInput, setSearchInput] = useState(null)
    const [searchResult, setSearchResult] = useState(null)
    const [selectedPO, setSelectedPO] = useState(null)
    const [routeList, setRouteList] = useState([])
    const [generatedBarcode, setGeneratedBarcode] = useState(null)

    const dispatch = useDispatch()
    const details = useSelector(state => state.details)

    useEffect(() => {
        dispatch(fetchDetails())
    }, [])

    
    useEffect(() => {
        console.log(generatedBarcode)
    }, [generatedBarcode])

    useEffect(() => {
        console.log(selectedPO)
        if (selectedPO) {
            if (selectedPO.length) {
                selectedPO[0].detail_style.process.unshift('ISR')
                let uniqueFilteredRoute = [...new Set(selectedPO[0].detail_style.process)]
                setRouteList(uniqueFilteredRoute)
            }
        }
    }, [selectedPO])

    useEffect(() => {
        const resultfilt = details.filter(det => (det.active ===true))  
        setSearchResult(resultfilt)
        
    }, [details])

    useEffect(() => {
    
        if (details) {
            if (details.length) {
                console.log(details[4].active)
                const searchResult = details.filter(det => ((det.po_number.includes(searchInput) || det.detail_customer.toUpperCase().includes(searchInput)) && det.active ===true))  
                setSearchResult(searchResult)
            }
        }
        
        
    }, [searchInput])

    useEffect(() => {
        console.log(searchResult)
    }, [searchResult])


    const handlePrint = () => {
		const input = document.getElementById('printForm');

		html2canvas(input)
		.then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF("p", "mm", "a4");
            let width = pdf.internal.pageSize.getWidth();
            let height = pdf.internal.pageSize.getHeight();
			pdf.addImage(imgData, 'JPEG', 0, 0,width,height);
			pdf.save(generatedBarcode);  
		});
	}

    return (
        <div className="isr-container"> 
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
    )
}

export default PO
