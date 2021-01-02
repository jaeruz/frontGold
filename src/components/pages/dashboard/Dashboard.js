import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import DashboardChart from './DashboardChart';
import DashboardTable from './DashboardTable';

function Dashboard() {
	const [chartOpen, setChartOpen] = useState(true);
	const handleChange = (e) => {
		let renderView = e.target.value;
		// console.log(e.target.value);
		// console.log(e.target.id);
		if (renderView === 'CHART') {
			setChartOpen(true);
		} else {
			setChartOpen(false);
		}
	};
	return (
		<Container className="dashboard-container">
			<Form.Group controlId="dashboard-view-as">
				<Form.Label>View as:</Form.Label>
				<Form.Control as="select" onChange={handleChange} className="form-caps">
					<option>CHART</option>
					<option>TABLE</option>
				</Form.Control>
			</Form.Group>
			<div class="dashboard-components">
				{chartOpen ? <DashboardChart /> : <DashboardTable />}
			</div>
		</Container>
	);
}

export default Dashboard;
