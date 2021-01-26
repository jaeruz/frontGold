import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function SideBarMenu({ item, showSidebar, isMain }) {
  const [subnav, setSubnav] = useState(false)
  const showSubnav = () => setSubnav(!subnav)

  return (
    <li>
      <Link
        to={item.path}
        className={item.class_name}
        onClick={item.subNav && showSubnav}
      >
        <div>
          {item.icon}
          <span>{item.title}</span>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>
      {subnav &&
        item.subNav.map((item, index) => {
          if (isMain) {
            if (item.title !== "Generate Barcodes") {
              return (
                <Link
                  to={item.path}
                  key={index}
                  className="sub-links"
                  onClick={
                    item.path === "/process/scan" || item.path === "/process/po"
                      ? () => showSidebar()
                      : null
                  }
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )
            }
          } else {
            return (
              <Link
                to={item.path}
                key={index}
                className="sub-links"
                onClick={
                  item.path === "/process/scan" || item.path === "/process/po"
                    ? () => showSidebar()
                    : null
                }
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            )
          }
        })}
    </li>
  )
}

export default SideBarMenu
