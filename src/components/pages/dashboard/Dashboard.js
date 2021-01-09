import React, { useState,useEffect } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import DashboardChart from './DashboardChart';
import DashboardTable from './DashboardTable';

import { useDispatch,useSelector } from 'react-redux'
import { fetchDetails } from '../../../actions/DetailsActions';

function Dashboard() {
	const [chartOpen, setChartOpen] = useState(true);
	const dispatch = useDispatch()
	const details = useSelector(state => state.details)

	const handleChange = (e) => {
		// console.log(e.target.value);
		// console.log(e.target.id);
		if (e.target.value === 'CHART') {
			setChartOpen(true);
		} else {
			setChartOpen(false);
		}
	};

	
	useEffect(() => {
		dispatch(fetchDetails())
	}, [])

	useEffect(() => {
		details.map((d) => {
			console.log(d)
		})
	}, [details])

	return (
		<Container className="dashboard-container">
			<Form.Group controlId="dashboard-view-as">
				<div class="dashboard-view-wrapper">
					<Form.Label>View as:</Form.Label>
					<div class="dashboard-select-wrapper">
						<Form.Control
							as="select"
							onChange={handleChange}
							className="form-caps"
						>
							<option>CHART</option>
							<option>TABLE</option>
						</Form.Control>
					</div>
				</div>
			</Form.Group>
			<div class="dashboard-components">
				{chartOpen ? <DashboardChart /> : <DashboardTable />}
			</div>
		</Container>
	);
}

export default Dashboard;
