import React, { useState, useEffect } from 'react';
import {
	Container,
	Table,
	Form,
	Button,
	Modal,
	Col,
	Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../../actions/ItemActions';

function ViewItems() {
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
	const item = useSelector((state) => state.item);

	useEffect(() => {
		dispatch(getItems());
	}, []);

	useEffect(() => {
		console.log(item);
	}, [item]);
	return (
		<div className="view-item-container">
			<div style={{ textAlign: 'center' }}>
				<h3 className="form-title">ITEMS</h3>
			</div>
			<Form>
				<Form.Group>
					<Form.Label style={{ color: 'white' }}>SEARCH:</Form.Label>
					<Form.Control type="text" className="isr-form" />
				</Form.Group>
			</Form>
			<div className="po-container-table">
				<Table
					striped
					bordered
					hover
					style={{ backgroundColor: 'white', borderRadius: '10px' }}
				>
					<thead>
						<tr>
							<th>DATE</th>
							<th>CUSTOMER</th>
							<th>STYLE</th>
							<th>PROCESS</th>
							<th>ACTION</th>
						</tr>
					</thead>
					<tbody>
						{item.length ? (
							item.map((i) => {
								return (
									<tr>
										<td>1/12/1223</td>
										<td>{i.customer.toUpperCase()}</td>
										<td>{i.style.toUpperCase()}</td>
										<td>
											{i.process.map((p) => {
												return (p + ', ').toUpperCase();
											})}
										</td>
										<td>
											<Button
												type="button"
												variant="info"
												onClick={() => {
													setShowModal(!showModal);
												}}
											>
												Update
											</Button>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td colSpan="4" style={{ textAlign: 'center' }}>
									No Result
								</td>
							</tr>
						)}
						<Modal className="modal-positioning" show={showModal}>
							<Modal.Header>Update Items</Modal.Header>
							<Modal.Body>
								<Form>
									<Form.Group as={Row} controlId="">
										<Col sm="4">
											<Form.Label>Customer: </Form.Label>
										</Col>
										<Col sm="8">
											<Form.Control
												required
												type="text"
												className="form-caps"
											/>
										</Col>
									</Form.Group>
									<Form.Group as={Row} controlId="">
										<Col sm="4">
											<Form.Label>Style: </Form.Label>
										</Col>
										<Col sm="8">
											<Form.Control
												required
												type="text"
												className="form-caps"
											/>
										</Col>
									</Form.Group>
									<Form.Group as={Row} controlId="">
										<Col sm="4">
											<Form.Label>Processes: </Form.Label>
										</Col>
										<Col sm="8">
											<Form.Control
												required
												type="text"
												className="form-caps"
											/>
										</Col>
									</Form.Group>
								</Form>
							</Modal.Body>
							<Modal.Footer>
								<Button
									type="button"
									variant="danger"
									onClick={() => {
										setShowModal(!showModal);
									}}
								>
									Close
								</Button>
								<Button
									type="button"
									variant="success"
									onClick={() => {
										setShowModal(!showModal);
									}}
								>
									Submit
								</Button>
							</Modal.Footer>
						</Modal>
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default ViewItems;
