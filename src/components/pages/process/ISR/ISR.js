import React,{useEffect, useState} from 'react'
import { Col, Row } from 'react-bootstrap'
import ISRForm from './ISRForm'
import ISRPrintComponent from './ISRPrintComponent'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

function ISR() {
    const [ISRItem, setISRItem] = useState({
        detail_customer: '',
        barcode: '',
        po_number:'',
        sack_number: '',
        description: '',
        color: '',
        total: '',
        qty_sack: '',
        ship_date: '',
        detail_style: ''
    })
   

    useEffect(() => {
        let sackNum = document.getElementById('sack_number');
        let poNum = document.getElementById('po_number');
        let description = document.getElementById('description');
        let color = document.getElementById('color');
        let total = document.getElementById('total');
        let qty_sack = document.getElementById('qty_sack');
        let ship_date = document.getElementById('ship_date');
        let barcode = document.getElementById('barcode');

        sackNum.value = ''
        poNum.value = ''
        description.value = ''
        color.value = ''
        total.value = ''
        qty_sack.value = ''
        ship_date.value = ''
        barcode.value = ''
        
        setISRItem({
            ...ISRItem,
            barcode: '',
            po_number:'',
            sack_number: '',
            description: '',
            color: '',
            total: '',
            qty_sack: '',
            ship_date: '',
        })
        
    }, [ISRItem.detail_customer])
    
    useEffect(() => {
        let barcode = document.getElementById('barcode');
        barcode.value=ISRItem.barcode
    }, [ISRItem.barcode])



    const handlePrint = () => {
		const input = document.getElementById('printForm');

		html2canvas(input)
		.then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF();
			pdf.addImage(imgData, 'PNG', 0, 0);
			pdf.save("download.pdf");  
		});
	}

    return (
        <div className="isr-container">
            <Row style={{ margin: "0 auto" }}>
                {/* <Col lg={1}></Col> */}
                <Col lg={6}>
                    <div className="isr-container-form">
                        <ISRForm ISRItem={ISRItem} setISRItem={setISRItem} handlePrint={handlePrint}/>
                    </div>
                </Col>
                <Col lg={6}>
                    <div className="isr-container-print" id="printForm">
                        <ISRPrintComponent ISRItem={ISRItem}/>
                    </div>
                </Col>
                {/* <Col lg={1}></Col> */}
            </Row>
        </div>
    )
}

export default ISR
