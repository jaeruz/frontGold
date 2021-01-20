import React,{useEffect,useState} from 'react'
import {Button,Table,Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPurchaseDetails } from '../../../../actions/BarcodeScanActions'
import { MDBDataTable  } from 'mdbreact';



function ViewBarcodes() {
    const dispatch = useDispatch()
    const barcodeScanResult = useSelector(state => state.barcodeScanResult)
    const [rowData, setRowData] = useState([])

    useEffect(() => {
        dispatch(fetchPurchaseDetails())
    }, [])

    useEffect(() => {
        console.log(barcodeScanResult)
        if (barcodeScanResult.length && barcodeScanResult[0].create_on) {
            const data = barcodeScanResult.map(i => {
                return {
                    date: i.create_on,
                    barcode: i.barcode.toUpperCase(),
                    style: i.po_number.detail_style.style,
                    po: i.po_number.po_number.toUpperCase(),
                    color: i.po_number.color.toUpperCase(),
                    size:i.po_number.size.toUpperCase(),
                    qtysack:i.barcode.split('-')[4],
                    sackno:i.barcode.split('-')[5],
                    action: <Button variant="danger" size="sm">DELETE</Button>,
                }
            })
            console.log(data)
            setRowData(data);
        }
        
    }, [barcodeScanResult])


    const data = {
        columns: [
            {
                label: 'Date',
                field: 'date',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Barcode',
                field: 'barcode',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Style',
                field: 'style',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Po #',
                field: 'po',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Color',
                field: 'color',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Size',
                field: 'size',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Qty/Sack',
                field: 'qtysack',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Sack #',
                field: 'sackno',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Actions',
                field: 'action',
                sort: 'asc',
                width: 150
            },
        ],
        rows: rowData
    }
    return (
        <div className="view-item-wrapper">
        <div className="view-item-container">
            <div style={{textAlign:"center"}}>
                <h5 className="form-title">BARCODES</h5>
            </div>
       
                <div style={
                    {
                        backgroundColor: 'white',
                        padding: '20px',
                        // borderRadius: '5px',
                        height: '90%',
                        overflow: 'scroll',
                        overflowX: 'hidden',
                        marginTop: '20px',
                        
                    }}>
                    <MDBDataTable  
                        
                        entries={8}
                        striped
                        bordered
                        small
                        entriesOptions={[5,8,10,15]}
                        striped
                        hover
                        style={{height:'100% !important'}}
                        data={data}
                    />
                </div>
                
          
            </div>
            </div>
    )
}

export default ViewBarcodes
