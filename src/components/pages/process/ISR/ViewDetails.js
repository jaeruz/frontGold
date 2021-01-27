import React, { useEffect, useState } from "react"
import { Button, Table, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchDetails } from "../../../../actions/DetailsActions"
import * as FaIcons from "react-icons/fa"
import { MDBDataTable } from "mdbreact"
import { CSVLink } from "react-csv"
import moment from "moment"
import * as BiIcons from "react-icons/bi"
import axios from "axios"
import { useAlert } from "react-alert"

function ViewDetails() {
  const dispatch = useDispatch()
  const details = useSelector((state) => state.details)
  const [searchInput, setSearchInput] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  const [rowData, setRowData] = useState([])
  const [csvdata, setCsvdata] = useState([])
  const alert = useAlert()

  const handleDelete = async (id) => {
    console.log(id)
    const deleturl =
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":8000/api/detail-delete/" +
      id
    try {
      await axios
        .delete(deleturl, {
          data: null,
          headers: {
            Authorization:
              "token " +
              JSON.parse(window.localStorage.getItem("credentials")).token,
          },
        })
        .then((res) => {
          console.log(res)
          if (res.status == 201) {
            alert.show(
              <div className="alert-suc">
                <FaIcons.FaCheck /> {res.data}
              </div>
            )
          } else {
            alert.show(
              <div className="alert-err">
                <BiIcons.BiError /> {res.data}
              </div>
            )
          }
        })
    } catch (error) {
      console.log(error)
    }

    dispatch(fetchDetails())
  }

  useEffect(() => {
    dispatch(fetchDetails())
  }, [])

  useEffect(() => {
    console.log(details)
    if (details.length && details[0].create_on) {
      const data = details.map((i) => {
        return {
          date: moment(i.create_on).format("YYYY-MM-DD HH:MM"),
          customer: i.detail_customer.toUpperCase(),
          style: i.detail_style.style,
          po: i.po_number.toUpperCase(),
          shipdate: i.ship_date.toUpperCase(),
          color: i.color.toUpperCase(),
          size: i.size.toUpperCase(),
          total: i.total,
          totalsack: i.total_sack,
          action: (
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(i.id)}
            >
              <FaIcons.FaTrashAlt /> Delete
            </Button>
          ),
        }
      })
      console.log(data)
      setRowData(data)
      let csvd = details.map((i) => {
        return [
          moment(i.create_on).format("YYYY-MM-DD HH:MM"),
          i.detail_customer.toUpperCase(),
          i.detail_style.style,
          i.po_number.toUpperCase(),
          i.ship_date.toUpperCase(),
          i.color.toUpperCase(),
          i.size.toUpperCase(),
          i.total,
          i.total_sack,
        ]
      })
      csvd.unshift([
        "date",
        "customer",
        "style",
        "po#",
        "shipdate",
        "color",
        "size",
        "total",
        "totalSack",
      ])
      console.log(csvd)
      setCsvdata(csvd)
    }
  }, [details])

  const data = {
    columns: [
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Customer",
        field: "customer",
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
        label: "PO #",
        field: "po",
        sort: "asc",
        width: 150,
      },
      {
        label: "Ship Date",
        field: "shipdate",
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
        label: "Total",
        field: "total",
        sort: "asc",
        width: 150,
      },
      {
        label: "Total sack",
        field: "totalsack",
        sort: "asc",
        width: 150,
      },
      {
        label: "Actions",
        field: "action",
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
          <h5 className="form-title">PURCHASE ORDERS</h5>
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
            <CSVLink data={csvdata} filename={"details_data.csv"}>
              Export CSV
            </CSVLink>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ViewDetails
