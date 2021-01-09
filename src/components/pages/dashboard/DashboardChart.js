import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchDetails, fetchPurchase } from '../../../api';

function DashboardChart() {
	const COLORS = {
		Theme1: 'rgb(30, 60, 76, 0.7)',
		Theme2: 'rgb(59, 91, 109, 0.7)',
		Theme3: 'rgb(90, 124, 143, 0.7)',
		Theme4: 'rgb(121, 159, 179, 0.7)',
		Theme5: 'rgb(154, 195, 216, 0.7)',
		Theme6: 'rgb(188, 233, 255, 0.7)',
		green: 'rgb(0, 128, 0, 0.5)',
		greenBorder: 'rgb(0, 128, 0, 1)',
		orange: 'rgb(255, 165, 0, 0.5)',
		orangeBorder: 'rgb(255, 165, 0, 1)',
		HoverColor: 'rgb(82, 178, 191, 0.6)',
		HoverBorderColor: '#82eefb',
	};
	//const [filteredPurchase, setfilteredPurchase] = useState();
	const [purchases, setPurchases] = useState();
	const [details, setDetails] = useState();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		let flag = true;
		if (flag) {
			const purchases = await fetchPurchase();
			const details = await fetchDetails();
			console.log(purchases.data);
			console.log(details.data);
			setPurchases(purchases.data);
			setDetails(details.data);
		}
		return () => {
			flag = false;
		};
	}, []);
	useEffect(() => {
		if (purchases && details) {
			if (purchases.length && details.length) {
				const filteredPurc = purchases.filter(
					(purchase) => purchase.po_number.po_number === details[0].po_number
				);
				// console.log(purchases.data);
				// console.log(details.data);
				// console.log(filteredPurc.length);
				//setfilteredPurchase(filteredPurc);
			}
		}
	}, [purchases, details]);

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

	const DoughnutChartData = {
		labels: ['Active', 'Pending'],
		datasets: [
			{
				label: '# of Votes',
				data: [
					purchases ? purchases.length : 0,
					details && purchases ? details[0].total_sack - purchases.length : 0,
				],
				backgroundColor: [
					COLORS.green,
					COLORS.orange,
					// 'rgb(30, 60, 76, 0.7)',
					// 'rgb(59, 91, 109, 0.7)',
					// 'rgb(90, 124, 143, 0.7)',
					// 'rgb(121, 159, 179, 0.7)',
					// 'rgb(154, 195, 216, 0.7)',
					// 'rgb(188, 233, 255, 0.7)',
				],
				borderColor: [
					COLORS.greenBorder,
					COLORS.orangeBorder,
					// 'rgb(121, 159, 179, 1)',
					// 'rgb(90, 124, 143, 1)',
					// 'rgb(59, 91, 109, 1)',
					// 'rgb(30, 60, 76, 1)',
				],
				borderWidth: 1,
				hoverBackgroundColor: COLORS.HoverColor,
				hoverBorderColor: COLORS.HoverBorderColor,
				// borderAlign: 'inner',
			},
		],
	};

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
				<Col>
					<div class="chart-wrapper">
						<div className="chart-percent">
							<p>
								{((purchases ? purchases.length : 0) /
									(details ? details[0].total_sack : 0)) *
									100}
								%
							</p>
						</div>
						<Doughnut
							data={DoughnutChartData}
							options={{
								maintainAspectRatio: false,
								scales: {
									yAxes: [
										{
											display: false,
											// ticks: {
											// 	beginAtZero: true,
											// },
										},
									],
								},
								legend: {
									display: true,
									labels: {
										fontColor: '#1e3c4c',
										boxWidth: 40,
									},
									position: 'bottom',
								},
								title: {
									display: true,
									text: 'Purchase Order Status',
									fontSize: 20,
									fontColor: '#1e3c4c',
									fontStyle: 'bold',
								},
								layout: {
									padding: {
										left: 60,
										right: 60,
										bottom: 20,
										top: 10,
									},
								},
								tooltips: {
									enabled: true,
								},

								animation: {
									animateScale: true,
									duration: 3000,
								},
								// circumference: 2 * Math.PI,
								cutoutPercentage: 70,
							}}
						/>
					</div>
				</Col>
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
