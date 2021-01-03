import React from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { DataSample1, DataSample2, DataSample3, DataSample4 } from './Data';
import { Container, Row, Col } from 'react-bootstrap';

function DashboardChart() {
	return (
		<Container>
			<Row md={1} lg={2}>
				<Col>
					<div class="chart-wrapper">
						<Bar
							data={DataSample1}
							options={{
								maintainAspectRatio: false,

								scales: {
									xAxes: [
										{
											// stacked: true,
											gridLines: {
												offsetGridLines: true,
											},
										},
									],
									yAxes: [
										{
											// stacked: true,
											ticks: {
												beginAtZero: true,
											},
										},
									],
								},
								legend: {
									display: true,
									labels: {
										fontColor: '#1e3c4c',
										boxWidth: 40,
									},
									position: 'top',
								},
								title: {
									display: true,
									text: 'Data Sample 1',
									fontSize: 16,
									fontColor: '#1e3c4c',
								},
								layout: {
									padding: {
										left: 30,
										right: 30,
										bottom: 10,
										top: 0,
									},
								},
								tooltips: {
									enabled: true,
								},
							}}
						/>
					</div>
				</Col>
				<Col>
					<div class="chart-wrapper">
						<Doughnut
							data={DataSample2}
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
									position: 'right',
								},
								title: {
									display: true,
									text: 'Data Sample 2',
									fontSize: 16,
									fontColor: '#1e3c4c',
								},
								layout: {
									padding: {
										left: 30,
										right: 30,
										bottom: 10,
										top: 0,
									},
								},
								tooltips: {
									enabled: true,
								},
								// 	circumference: 2 * Math.PI,
								animation: {
									animateScale: true,
								},
							}}
						/>
					</div>
				</Col>
			</Row>
			<Row md={1} lg={2}>
				<Col>
					<div class="chart-wrapper">
						<Pie
							data={DataSample3}
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
									text: 'Data Sample 3',
									fontSize: 16,
									fontColor: '#1e3c4c',
								},
								layout: {
									padding: {
										left: 30,
										right: 30,
										bottom: 10,
										top: 0,
									},
								},
								tooltips: {
									enabled: true,
								},
								animation: {
									animateScale: true,
								},
							}}
						/>
					</div>
				</Col>
				<Col>
					<div class="chart-wrapper">
						<Line
							data={DataSample4}
							options={{
								maintainAspectRatio: false,
								scales: {
									yAxes: [
										{
											ticks: {
												beginAtZero: true,
											},
										},
									],
								},
								legend: {
									display: true,
									labels: {
										fontColor: '#1e3c4c',
										boxWidth: 40,
									},
									position: 'top',
								},
								title: {
									display: true,
									text: 'Data Sample 4',
									fontSize: 16,
									fontColor: '#1e3c4c',
								},
								layout: {
									padding: {
										left: 30,
										right: 30,
										bottom: 10,
										top: 0,
									},
								},
								tooltips: {
									enabled: true,
								},
							}}
						/>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default DashboardChart;
