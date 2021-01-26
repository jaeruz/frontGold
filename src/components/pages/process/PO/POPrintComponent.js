import React from "react"
import { Col, Container, Table, Row } from "react-bootstrap"
import QRCode from "qrcode.react"

function POTable({ selectedPO, routeList, generatedBarcode }) {
  return (
    <div className="po-container-print-div">
      {selectedPO ? (
        selectedPO.length ? (
          <>
            <div className="po-container-print" id="printForm">
              <p className="print-form-title">
                GOLDEN ZONE GARMENTS AND ACCESSORIES,INC ROUTE SHEET
              </p>
              <Row>
                <Col sm={6} className="print-form-details">
                  <ul>
                    <li>
                      CUSTOMER: <span>{selectedPO[0].detail_customer}</span>
                    </li>
                    <li>
                      PO #: <span>{selectedPO[0].po_number}</span>
                    </li>
                    <li>
                      STYLE: <span>{selectedPO[0].detail_style.style}</span>{" "}
                    </li>
                    <li>
                      DESCRIPTION: <span>{selectedPO[0].description}</span>
                    </li>
                    <li>
                      COLOR: <span>{selectedPO[0].color}</span>
                    </li>
                    <li>
                      TOTAL Q'TY: <span>{selectedPO[0].total}</span>
                    </li>
                    <li>
                      Q'TY/SACK:
                      <span>
                        {generatedBarcode.split("-")[5] ==
                        selectedPO[0].total_sack
                          ? selectedPO[0].qty_sack -
                            (selectedPO[0].qty_sack * selectedPO[0].total_sack -
                              selectedPO[0].total)
                          : selectedPO[0].qty_sack}
                      </span>
                    </li>
                    <li>
                      SHIPDATE: <span>{selectedPO[0].ship_date}</span>
                    </li>
                  </ul>
                </Col>
                <Col sm={4}>
                  <div className="print-sack-number">
                    <p>SACK NO.</p>
                    <p>
                      {" "}
                      {generatedBarcode.split("-")[5]} /{" "}
                      {selectedPO[0].total_sack}
                    </p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={11}>
                  <Table bordered className="route-table">
                    <thead>
                      <tr>
                        <th>OPERATION</th>
                        <th>TRANSFERRED BY (NAME/DATE)</th>
                        <th>TRANSFER TO</th>
                        <th>RECEIVED BY (NAME/DATE)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routeList &&
                        routeList.map((route, index) => {
                          if (routeList.length !== index + 1) {
                            return (
                              <tr key={index}>
                                <td>{route.toUpperCase()}</td>
                                <td></td>
                                <td>{routeList[index + 1].toUpperCase()}</td>
                                <td></td>
                              </tr>
                            )
                          }
                        })}
                    </tbody>
                  </Table>
                </Col>
              </Row>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "35px",
                  marginRight: "35px",
                }}
              >
                {/* <div className="print-barcode">
                                <ReactBarcode value={generatedBarcode} width={0.4} height={55} margin={0} fontSize={6} />
                            </div> */}
                <QRCode
                  value={generatedBarcode}
                  style={{
                    display: "block",
                    marginRight: "30px",
                    width: "4vw",
                    height: "7vh",
                  }}
                />
                <p style={{ fontSize: "10px" }}>{generatedBarcode}</p>
              </div>
            </div>
          </>
        ) : (
          <p>loading..</p>
        )
      ) : (
        <p style={{ marginTop: "48%", textAlign: "center" }}>
          SELECT PO TO GENERATE ROUTE SHEET
        </p>
      )}
    </div>
  )
}

export default POTable
