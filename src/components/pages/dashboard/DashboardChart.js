import React, { useEffect } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchDetails } from '../../../actions/DetailsActions';
import { useDispatch, useSelector } from 'react-redux';

function DashboardChart() {
	const dispatch = useDispatch();
	const details = useSelector((state) => state.details);

	useEffect(() => {
		dispatch(fetchDetails());
	}, []);

	useEffect(() => {
		details.map((detail) => {
			console.log(detail);
		});
	}, [details]);

	/* DATA SAMPLE */
	/*=============================================================================================================*/
	// const BarChartData = {
	// 	labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5', 'Data 6'],
	// 	datasets: [
	// 		{
	// 			label: '# of Votes',
	// 			data: [12, 19, 3, 5, 10, 16],
	// 			backgroundColor: [
	// 				'rgb(30, 60, 76, 0.7)',
	// 				'rgb(59, 91, 109, 0.7)',
	// 				'rgb(90, 124, 143, 0.7)',
	// 				'rgb(121, 159, 179, 0.7)',
	// 				'rgb(154, 195, 216, 0.7)',
	// 				'rgb(188, 233, 255, 0.7)',
	// 			],
	// 			borderColor: [
	// 				'rgb(188, 233, 255, 1)',
	// 				'rgb(154, 195, 216, 1)',
	// 				'rgb(121, 159, 179, 1)',
	// 				'rgb(90, 124, 143, 1)',
	// 				'rgb(59, 91, 109, 1)',
	// 				'rgb(30, 60, 76, 1)',
	// 			],
	// 			borderWidth: 1,
	// 			// hoverBackgroundColor: 'rgb(1, 171, 192,0.6)',
	// 			// hoverBorderColor: '#00d4e2',
	// 			// borderSkippped: 'bottom',
	// 			// barPercentage: 1,
	// 			// category: 1,
	// 			// barThickness: 6,
	// 			// maxBarThickness: 8,
	// 			// minBarLength: 2,
	// 		},
	// 		// {
	// 		// 	label: '# of Votes',
	// 		// 	data: [15, 21, 9, 8, 15, 20],
	// 		// 	backgroundColor: [
	// 		// 		'rgb(30, 60, 76, 0.7)',
	// 		// 		'rgb(59, 91, 109, 0.7)',
	// 		// 		'rgb(90, 124, 143, 0.7)',
	// 		// 		'rgb(121, 159, 179, 0.7)',
	// 		// 		'rgb(154, 195, 216, 0.7)',
	// 		// 		'rgb(188, 233, 255, 0.7)',
	// 		// 	],
	// 		// 	borderColor: [
	// 		// 		'rgb(188, 233, 255, 1)',
	// 		// 		'rgb(154, 195, 216, 1)',
	// 		// 		'rgb(121, 159, 179, 1)',
	// 		// 		'rgb(90, 124, 143, 1)',
	// 		// 		'rgb(59, 91, 109, 1)',
	// 		// 		'rgb(30, 60, 76, 1)',
	// 		// 	],
	// 		// 	borderWidth: 1,
	// 		// 	// hoverBackgroundColor: 'rgb(1, 171, 192,0.6)',
	// 		// 	// hoverBorderColor: '#00d4e2',
	// 		// 	// borderSkippped: 'bottom',
	// 		// 	barPercentage: 1,
	// 		// 	category: 1,
	// 		// 	// barThickness: 6,
	// 		// 	// maxBarThickness: 8,
	// 		// 	// minBarLength: 2,
	// 		// },
	// 	],
	// };

	// const DoughnutChartData = {
	// 	labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5', 'Data 6'],
	// 	datasets: [
	// 		{
	// 			label: '# of Votes',
	// 			data: [12, 19, 3, 5, 2, 3],
	// 			backgroundColor: [
	// 				'rgb(30, 60, 76, 0.7)',
	// 				'rgb(59, 91, 109, 0.7)',
	// 				'rgb(90, 124, 143, 0.7)',
	// 				'rgb(121, 159, 179, 0.7)',
	// 				'rgb(154, 195, 216, 0.7)',
	// 				'rgb(188, 233, 255, 0.7)',
	// 			],
	// 			borderColor: [
	// 				'rgb(188, 233, 255, 1)',
	// 				'rgb(154, 195, 216, 1)',
	// 				'rgb(121, 159, 179, 1)',
	// 				'rgb(90, 124, 143, 1)',
	// 				'rgb(59, 91, 109, 1)',
	// 				'rgb(30, 60, 76, 1)',
	// 			],
	// 			borderWidth: 1,
	// 			// borderAlign: 'inner',
	// 		},
	// 	],
	// };

	// const PieChartData = {
	// 	labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5', 'Data 6'],
	// 	datasets: [
	// 		{
	// 			label: '# of Votes',
	// 			data: [12, 19, 3, 5, 2, 3],
	// 			backgroundColor: [
	// 				'rgb(30, 60, 76, 0.7)',
	// 				'rgb(59, 91, 109, 0.7)',
	// 				'rgb(90, 124, 143, 0.7)',
	// 				'rgb(121, 159, 179, 0.7)',
	// 				'rgb(154, 195, 216, 0.7)',
	// 				'rgb(188, 233, 255, 0.7)',
	// 			],
	// 			borderColor: [
	// 				'rgb(188, 233, 255, 1)',
	// 				'rgb(154, 195, 216, 1)',
	// 				'rgb(121, 159, 179, 1)',
	// 				'rgb(90, 124, 143, 1)',
	// 				'rgb(59, 91, 109, 1)',
	// 				'rgb(30, 60, 76, 1)',
	// 			],
	// 			borderWidth: 1,
	// 		},
	// 	],
	// };

	// const LineChartData = {
	// 	labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5', 'Data 6'],
	// 	datasets: [
	// 		{
	// 			label: '# of Votes',
	// 			data: [12, 19, 3, 5, 2, 3],
	// 			backgroundColor: 'rgb(90, 124, 143, 0.7)',
	// 			borderColor: 'rgb(30, 60, 76, 1)',
	// 			borderWidth: 1,
	// 			// borderWidth: 1.5,
	// 			// borderCapStyle: 'round',
	// 			// fill: false,
	// 			// lineTension: 0,
	// 		},
	// 	],
	// };
	/*=============================================================================================================*/

	return (
		<Container>
			<Row md={1} lg={2}>
				<Col></Col>
				<Col></Col>
			</Row>
			<Row md={1} lg={2}>
				<Col></Col>
				<Col></Col>
			</Row>
		</Container>
	);
}

export default DashboardChart;
