import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { BrowserRouter } from "react-router-dom"
import { logout } from "./actions/AuthActions"
import SignIn from "./components/auth/SignIn"
import MyNavbar from "./components/layout/MyNavbar"
import Pages from "./components/pages/Pages"
import { useDispatch, useSelector } from "react-redux"

function App() {
  const [sidebar, setSidebar] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [cached, setCached] = useState(null)
  const dispatch = useDispatch()
  const [isMain, setIsMain] = useState(false)

  document.onkeydown = function (evt) {
    evt = evt || window.event
    var isEscape = false
    if ("key" in evt) {
      isEscape = evt.key === "Escape" || evt.key === "Esc"
    } else {
      isEscape = evt.keyCode === 27
    }
    if (isEscape) {
      setSidebar(false)
    }
  }
  const auth = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())

    setSidebar(false)
  }

  useEffect(() => {
    const cacheCreds = JSON.parse(window.localStorage.getItem("credentials"))
    setCached(cacheCreds)
  }, [auth])

  if (cached) {
    return (
      <BrowserRouter>
        <div className="nav">
          {" "}
          {/*onMouseLeave={() => { setSidebar(false)}}>*/}
          <MyNavbar
            sidebar={sidebar}
            setSidebar={setSidebar}
            isAdmin={cached.is_Admin}
            setIsAdmin={setIsAdmin}
            handleLogout={handleLogout}
            isMain={isMain}
          />
        </div>
        <Pages sidebar={sidebar} setSidebar={setSidebar} isMain={isMain} />
      </BrowserRouter>
    )
  } else {
    //signin
    return <SignIn setCached={setCached} cached={cached} />
  }
}

export default App
