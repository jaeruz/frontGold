import React,{useEffect,useState} from 'react'
import {Button,Table,Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetails } from '../../../../actions/DetailsActions'
import * as FaIcons from 'react-icons/fa'

function ViewDetails() {
    const dispatch = useDispatch()
    const details = useSelector(state => state.details)
    const [searchInput, setSearchInput] = useState(null)
    const [searchResult, setSearchResult] = useState(null)
    

    const handleSearch = (e) => {
        setSearchInput(e.target.value)
    }

    useEffect(() => {
        if (searchInput) {
            const result = details.filter((it) => {
                return it.color.toUpperCase().includes(searchInput.toUpperCase())
                    || it.create_on.toUpperCase().includes(searchInput.toUpperCase())
                    || it.detail_customer.toUpperCase().includes(searchInput.toUpperCase())
                    || it.po_number.toUpperCase().includes(searchInput.toUpperCase())
                    || it.ship_date.toUpperCase().includes(searchInput.toUpperCase())
                    || it.size.toUpperCase().includes(searchInput.toUpperCase())
            })
            setSearchResult(result)
        } else {
            setSearchResult(details)
        }
    }, [searchInput])

    useEffect(() => {
        dispatch(fetchDetails())
    }, [])

    useEffect(() => {
        setSearchResult(details)
    }, [details])
    return (
        <div className="view-item-container">
            <div style={{textAlign:"center"}}>
                <h3 className="form-title">PURCHASE ORDERS</h3>
            </div>
            <Form>
                <Form.Group>
                    <Form.Label style={{color:'white'}}>SEARCH:</Form.Label>
                    <Form.Control type='text' className="isr-form" onChange={handleSearch}/>
                </Form.Group>
            </Form>
            <div className="view-item-container-form">
                <Table striped bordered hover style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>CUSTOMER</th>
                            <th>STYLE</th>
                            <th>PO NO.</th>
                            <th>SHIP DATE</th>
                            <th>COLOR</th>
                            <th>SIZE</th>
                            <th>TOTAL</th>
                            <th>TOTAL SACK</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult && searchResult.length ? searchResult.map(((i,index) => {
                            return (
                                <tr key={index}>
                                    <td>{i.create_on}</td>
                                    <td>{i.detail_customer.toUpperCase()}</td>
                                    <td>{i.detail_style.style}</td>
                                    <td>{i.po_number.toUpperCase()}</td>
                                    <td>{i.ship_date.toUpperCase()}</td>
                                    <td>{i.color.toUpperCase()}</td>
                                    <td>{i.size.toUpperCase()}</td>
                                    <td>{i.total}</td>
                                    <td>{i.total_sack}</td>
                                    <td><Button variant="danger"><FaIcons.FaTrashAlt /> Delete</Button></td>
                                </tr>
                            )
                        })): (
                            <tr>
                                <td colSpan="10" style={{textAlign:'center'}}>No Result</td>
                            </tr>)
                        }
                        
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ViewDetails
