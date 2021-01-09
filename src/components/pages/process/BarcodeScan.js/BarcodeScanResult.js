import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';

function BarcodeScanResult({ barcodeCopy }) {
	const barcodeScanResult = useSelector((state) => state.barcodeScanResult);

	useEffect(() => {
		console.log(barcodeScanResult);
	}, [barcodeScanResult]);
	return (
		<div className="barcode-scan-result">
			<h1 className="form-title" style={{ textAlign: 'center' }}>
				Result
			</h1>
			<br />
			<br />

			{barcodeScanResult.length && barcodeCopy.barcode ? (
				<div className="details-result">
					<p>
						<span>{barcodeCopy.barcode}</span>
					</p>
					<h2>
						PO Number:<span>{barcodeCopy.barcode.split('-')[1]}</span>
					</h2>
					<h2>
						STYLE:<span>{barcodeCopy.barcode.split('-')[0]}</span>
					</h2>
					<h2>
						COLOR:<span>{barcodeCopy.barcode.split('-')[2]}</span>
					</h2>
					<h2>
						SACK #:<span>{barcodeCopy.barcode.split('-')[3]}</span>
					</h2>
					<h2>
						NEXT PROCESS:<span>{barcodeScanResult}</span>
					</h2>
				</div>
			) : (
				<p>No Result</p>
			)}
		</div>
	);
}

export default BarcodeScanResult;
