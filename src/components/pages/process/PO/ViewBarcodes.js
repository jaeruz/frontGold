import React, { useEffect, useState } from "react"
import { Button, Table, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchPurchaseDetails } from "../../../../actions/BarcodeScanActions"
import { MDBDataTable } from "mdbreact"
import { CSVLink } from "react-csv"
import moment from "moment"

function ViewBarcodes({ isMain }) {
  const dispatch = useDispatch()
  const barcodeScanResult = useSelector((state) => state.barcodeScanResult)
  const [rowData, setRowData] = useState([])
  const [csvdata, setCsvdata] = useState([])

  useEffect(() => {
    dispatch(fetchPurchaseDetails())
  }, [])

  useEffect(() => {
    if (barcodeScanResult.length && barcodeScanResult[0].create_on && !isMain) {
      const data = barcodeScanResult.map((i) => {
        return {
          date: moment(i.create_on).format("YYYY-MM-DD HH:MM"),
          barcode: i.barcode.toUpperCase(),
          style: i.po_number.detail_style.style,
          po: i.po_number.po_number.toUpperCase(),
          color: i.po_number.color.toUpperCase(),
          size: i.po_number.size.toUpperCase(),
          qtysack: i.barcode.split("-")[4],
          sackno: i.barcode.split("-")[5],
        }
      })

      setRowData(data)
      let csvd = barcodeScanResult.map((i) => {
        return [
          moment(i.create_on).format("YYYY-MM-DD HH:MM"),
          i.barcode.toUpperCase(),
          i.po_number.detail_style.style,
          i.po_number.po_number.toUpperCase(),
          i.po_number.color.toUpperCase(),
          i.po_number.size.toUpperCase(),
          i.barcode.split("-")[4],
          i.barcode.split("-")[5],
        ]
      })
      csvd.unshift([
        "date",
        "barcode",
        "style",
        "po#",
        "color",
        "size",
        "qty/sack",
        "sack#",
      ])

      setCsvdata(csvd)
    } else if (
      barcodeScanResult.length &&
      barcodeScanResult[0].create_on &&
      isMain
    ) {
      const data = barcodeScanResult.map((i) => {
        return {
          date: moment(i.create_on).format("YYYY-MM-DD HH:MM"),
          barcode: i.barcode.toUpperCase(),
        }
      })
      setRowData(data)
      let csvd = barcodeScanResult.map((i) => {
        return [
          moment(i.create_on).format("YYYY-MM-DD HH:MM"),
          i.barcode.toUpperCase(),
        ]
      })
      csvd.unshift(["date", "barcode"])
      setCsvdata(csvd)
    }
  }, [barcodeScanResult])

  const data = {
    columns: isMain
      ? [
          {
            label: "Date",
            field: "date",
            sort: "asc",
            width: 150,
          },
          {
            label: "Barcode",
            field: "barcode",
            sort: "asc",
            width: 150,
          },
        ]
      : [
          {
            label: "Date",
            field: "date",
            sort: "asc",
            width: 150,
          },
          {
            label: "Barcode",
            field: "barcode",
            sort: "asc",
            width: 150,
          },
          {
            label: "Style",
            field: "style",
            sort: "asc",
            width: 150,
          },
          {
            label: "Po #",
            field: "po",
            sort: "asc",
            width: 150,
          },
          {
            label: "Color",
            field: "color",
            sort: "asc",
            width: 150,
          },
          {
            label: "Size",
            field: "size",
            sort: "asc",
            width: 150,
          },
          {
            label: "Qty/Sack",
            field: "qtysack",
            sort: "asc",
            width: 150,
          },
          {
            label: "Sack #",
            field: "sackno",
            sort: "asc",
            width: 150,
          },
        ],
    rows: rowData,
  }
  return (
    <div className="view-item-wrapper">
      <div className="view-item-container">
        <div style={{ textAlign: "center" }}>
          <h5 className="form-title">BARCODES</h5>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            // borderRadius: '5px',
            height: "90%",
            overflow: "scroll",
            overflowX: "hidden",
            marginTop: "20px",
          }}
        >
          <MDBDataTable
            entries={8}
            striped
            bordered
            small
            entriesOptions={[5, 8, 10, 15]}
            striped
            hover
            className="data-style"
            data={data}
          />
          {csvdata.length ? (
            <CSVLink
              data={csvdata}
              filename={isMain ? "barcodes_data_main.csv" : "barcodes_data.csv"}
            >
              Export CSV
            </CSVLink>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ViewBarcodes
