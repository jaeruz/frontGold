import React, { useEffect,useState } from 'react'
import {Container,Table,Form, Button,Modal} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from '../../../actions/ItemActions'
import * as FaIcons from 'react-icons/fa'

function ViewItems() {
    
    const dispatch = useDispatch()
    const item = useSelector(state => state.item)

    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [searchInput, setSearchInput] = useState(null)
    const [searchResult, setSearchResult] = useState(null)
    //modal

    const [ItemClass, setItemClass] = useState({
        process: [],
        customer: '',
        style:''
    })

    const handleSearch = (e) => {
        setSearchInput(e.target.value)
    }

    const handleFormChange = (e) => {
        setItemClass({
            ...ItemClass,
            [e.target.id]:e.target.value
        })
    }

    const handleChange = (e) => {
        
        let processList = []
        let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
        for (let i = 0; i < checkboxes.length; i++){
            processList.push(checkboxes[i].value)
        }
        setItemClass({
            ...ItemClass,
            process: processList,
        })
    }

    const [selectedItems, setSelectedItems] = useState(null)

    const handleEdit = (i) => {
        
        const selItem = item.filter((it)=>{return it.style===i.style})
        setSelectedItems(selItem)
        setItemClass({
            style: i.style.toUpperCase(),
            customer: i.customer.toUpperCase(),
            process: i.process
        })
        handleShow()
    }

    useEffect(() => {
        if (show) {
            let processCheckbox = document.getElementById("check1");
            if (processCheckbox && selectedItems &&setSelectedItems.length) {
                console.log(processCheckbox)
                for (let i = 1; i != 12; i++){
                    for (let j = 0; j != selectedItems[0].process.length; j++){
                        if (document.getElementById(`check${i}`).value === selectedItems[0].process[j]) {
                        document.getElementById(`check${i}`).checked = true
                        }
                    }
                }
            }
   
        }
        
    }, [show])

    

    useEffect(() => {
        if (searchInput) {
            const result = item.filter((it) => {
                return it.customer.toUpperCase().includes(searchInput.toUpperCase())
                    || it.style.includes(searchInput.toUpperCase())
                    || it.process.includes(searchInput)
            })
            setSearchResult(result)
        } else {
            setSearchResult(item)
        }
        console.log(searchInput)
    }, [searchInput])
    
    useEffect(() => {
        dispatch(getItems())
    }, [])

    useEffect(() => {
        console.log(item)
        setSearchResult(item)
    }, [item])
    return (
        <div className="view-item-container">
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                centered
                size="lg">
                
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedItems && selectedItems.length ? (
                        <div className="modal-edit">
                    <Form id="form-add-item">
                        <Form.Group controlId="customer" >
                            <Form.Label>Customer:</Form.Label>
                            <Form.Control required type="text" placeholder="Customer" defaultValue={selectedItems[0].customer} onChange={handleFormChange} className="form-caps"/>
                        </Form.Group>
                        <Form.Group controlId="style">
                            <Form.Label>Style:</Form.Label>
                            <Form.Control required type="text" placeholder="Style" defaultValue={selectedItems[0].style} onChange={handleFormChange} className="form-caps" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Process:</Form.Label>
                                    <Form.Check
                                        label="Knitting"
                                        value="knitting"
                                        id="check1"
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        label="Cutting"
                                        value="cutting"
                                        id="check2"
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        label="ISR 1"
                                        value="isr_1"
                                        id="check3"
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        label="Sewing"
                                        value="sewing"
                                        id="check4"
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        label="ISR 2"
                                        value="isr_2"
                                        id="check5"
                                        onChange={handleChange}
                                    />
                                    
                                    <Form.Check
                                        label="B1 Receipts"
                                        value="reciepts"
                                        id="check6"
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        label="Steaming"
                                        value="steaming"
                                        id="check7"
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        label="Tagging"
                                        value="tagging"
                                        id="check8"
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        label="Final Examination"
                                        value="finalexam"
                                        id="check9"
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        label="Metal Detection"
                                        value="metaldetect"
                                        id="check10"
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        label="Boxing"
                                        value="boxing"
                                        id="check11"
                                        onChange={handleChange}
                                    />
                        </Form.Group>
                        </Form>
                        </div>
                    ):(<p>loading</p>)}
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            <div style={{textAlign:"center"}}>
                <h3 className="form-title">ITEMS</h3>
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
                            <th>PROCESS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult && searchResult.length ? searchResult.map(((i,index) => {
                            return (
                                <tr key={index}>
                                    <td>1/12/1223</td>
                                    <td>{i.customer.toUpperCase()}</td>
                                    <td>{i.style.toUpperCase()}</td>
                                    <td style={{ fontSize: '12px' }}>{i.process.map((p, index) => { if (index !== i.process.length-1) { return ((p + ', ').toUpperCase()) } else { return ((p).toUpperCase()) }   })}</td>
                                    <td><Button variant="info" onClick={()=>handleEdit(i)} block><FaIcons.FaEdit /> Edit</Button></td>
                                </tr>
                            )
                        })): (
                            <tr>
                                <td colSpan="5" style={{textAlign:'center'}}>No Result</td>
                            </tr>)
                        }
                        
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ViewItems
