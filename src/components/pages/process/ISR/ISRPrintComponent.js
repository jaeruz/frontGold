import React, {useEffect, useState} from 'react'
import { Col, Container, Table, Row } from 'react-bootstrap';
import { useBarcode } from '@createnextapp/react-barcode';
import { useDispatch,useSelector } from 'react-redux'
import { getItems } from '../../../../actions/ItemActions';


function ISRPrintComponent({ ISRItem }) {
    
    const dispatch = useDispatch()
    const item = useSelector(state => state.item)
    const [routeList, setRouteList] = useState([])
    
    // const [bar, setBar] = useState('null')

    // let {inputRef}  = useBarcode({
    //     value: bar ? bar:'null',
    //     options: {
    //         background: '#ffffff',
    //         width: 1,
    //         height: 40,
    //         fontSize: 13
    //     }
    // });

    // useEffect(() => {
    //     setBar(ISRItem.barcode)
    // }, [ISRItem.barcode,ISRItem.detail_customer])
    useEffect(() => {
        dispatch(getItems())
    }, [])

    useEffect(() => {
        console.log(item)
    }, [item])

    useEffect(() => {
        console.log(routeList)
    }, [routeList])

    useEffect(() => {
        let styleField = document.getElementById('style-field');
        let style = document.getElementById('detail_style');
        if (style.selectedIndex!==-1) {
         styleField.textContent= style.options[style.selectedIndex].innerHTML   
        }
        if (styleField.textContent !== null) {
            let filteredStyle = item.filter(i => i.style === styleField.textContent)
            if (filteredStyle.length) {
                if (filteredStyle[0].process.length) {
                    filteredStyle[0].process.unshift('ISR')
                    let uniqueFilteredStyle = [...new Set(filteredStyle[0].process)]
                    setRouteList(uniqueFilteredStyle)
                }
            }     
        }
    }, [ISRItem])

    return ( 
        <Container className="print-form">
            <p className="print-form-title">GOLDEN ZONE GARMENTS AND ACCESSORIES,INC ROUTE SHEET</p>
            <Row>
                <Col sm={6} className="print-form-details">
                    <ul>
                        <li>CUSTOMER: <span>{ISRItem.detail_customer}</span></li>
                        <li>PO #: <span>{ ISRItem.po_number}</span></li>
                        <li>STYLE: <span id="style-field">0</span> </li>
                        <li>DESCRIPTION: <span>{ ISRItem.description}</span></li>
                        <li>COLOR: <span>{ISRItem.color}</span></li>
                        <li>TOTAL Q'TY: <span>{ ISRItem.total}</span></li>
                        <li>Q'TY/SACK: <span>{ ISRItem.qty_sack}</span></li>
                        <li>SHIPDATE: <span>{ISRItem.ship_date}</span></li>
                    </ul>
                </Col>
                <Col sm={4}>
                    <div className="print-sack-number">
                        <h5>SACK NO.</h5>
                        <h6> 0 / { ISRItem.sack_number}</h6>
                    </div>
                </Col>
            </Row>
            {/* <div style={{padding:"30px"}}></div> */}
            {/* <div className="print-barcode">
                <Image ref={inputRef} />
            </div> */}
            <Row>
                <Col lg={11}>
                    <Table bordered className="route-table">
                    <thead>
                        <tr>
                        <th>OPERATION</th>
                        <th>TRANSFERRED BY (NAME/DATE)</th>
                        <th>TRANSFER TO</th>
                        <th>RECEIVED BY (NAME/DATE)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routeList && routeList.map((route, index) => {
                            if (routeList.length !== index+1) {
                                return (
                                    <tr key={index}>
                                        <td>{route.toUpperCase()}</td>
                                        <td></td>
                                        <td>{routeList[index + 1].toUpperCase()}</td>
                                        <td></td>
                                    </tr>
                                )
                            }
                            
                        })}
                        {/* <tr>
                        <td>ISR</td>
                        <td></td>
                        <td>KNITTING</td>
                        <td></td>
                        </tr>
                        <tr>
                        <td>KNITTING</td>
                        <td></td>
                        <td>SEWING</td>
                        <td></td>
                        </tr>
                        <tr>
                        <td>SEWING</td>
                        <td></td>
                        <td>FINAL EXAM</td>
                        <td></td>
                        </tr> */}
                    </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
     );
}

export default ISRPrintComponent
