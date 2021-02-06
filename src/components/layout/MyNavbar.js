import React from "react"
import { Link, withRouter } from "react-router-dom"
import * as FaIcons from "react-icons/fa"
import { SideBarDataAdmin, SideBarDataStaff } from "./SideBarData"
import { IconContext } from "react-icons"
import SideBarMenu from "./SideBarMenu"
import * as RiIcons from "react-icons/ri"
import { GiConsoleController } from "react-icons/gi"

function MyNavbar({
  sidebar,
  setSidebar,
  isAdmin,
  setIsAdmin,
  handleLogout,
  history,
  isMain,
}) {
  const showSidebar = () => setSidebar(!sidebar)

  const handleClick = () => {
    handleLogout()
    window.localStorage.clear()
    history.push("/")
  }

  return (
    <>
      <IconContext.Provider value={{ color: "white" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

          {isAdmin ? (
            <div
              onClick={() => {
                setIsAdmin(!isAdmin)
              }}
            >
              <FaIcons.FaUserTie style={{ fontSize: "30px" }} />
              <span style={{ color: "white", marginRight: "10px" }}>Admin</span>
            </div>
          ) : (
            <div
              onClick={() => {
                setIsAdmin(!isAdmin)
              }}
            >
              <FaIcons.FaUserInjured style={{ fontSize: "30px" }} />
              <span style={{ color: "white", marginRight: "10px" }}>Staff</span>
            </div>
          )}
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            {isAdmin
              ? SideBarDataAdmin.map((item, index) => {
                  if (isMain) {
                    if (item.title !== "Orders") {
                      return (
                        <SideBarMenu
                          item={item}
                          key={index}
                          isMain={isMain}
                          showSidebar={showSidebar}
                        />
                      )
                    }
                  } else {
                    return (
                      <SideBarMenu
                        item={item}
                        key={index}
                        isMain={isMain}
                        showSidebar={showSidebar}
                      />
                    )
                  }
                })
              : SideBarDataStaff.map((item, index) => {
                  return (
                    <SideBarMenu
                      item={item}
                      key={index}
                      showSidebar={showSidebar}
                    />
                  )
                })}

            <li
              style={{ display: "block", width: "100%" }}
              className="nav-text"
              onClick={handleClick}
            >
              <RiIcons.RiLogoutBoxLine />
              <span>LOGOUT</span>
            </li>
            <div style={{ paddingBottom: "20vh" }}></div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default withRouter(MyNavbar)
