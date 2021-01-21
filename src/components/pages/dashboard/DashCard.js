import React from "react"
import { Row, Col } from "react-bootstrap"

function DashCard({ stylclass, icon, val, caption }) {
  return (
    <div className={stylclass}>
      <div style={{ marginTop: "10px" }}>{icon}</div>

      <div>
        <span id="val-card">{val}</span>
        <span id="lbl-card">{caption}</span>
      </div>
    </div>
  )
}

export default DashCard
