import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { logout } from "./actions/AuthActions";
import SignIn from "./components/auth/SignIn";
import MyNavbar from "./components/layout/MyNavbar";
import Pages from "./components/pages/Pages";
import { useDispatch, useSelector } from 'react-redux'


function App() {
  const [sidebar, setSidebar] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [cached, setCached] = useState(null)
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  
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
        <div className="nav"> {/*onMouseLeave={() => { setSidebar(false)}}>*/}
          <MyNavbar sidebar={sidebar} setSidebar={setSidebar} isAdmin={cached.is_Admin} setIsAdmin={setIsAdmin} handleLogout={handleLogout}/>
        </div>
        <Pages sidebar={sidebar} setSidebar={setSidebar} />
       
      </BrowserRouter>
    )
  } else {
    //signin
    return (
      <SignIn setCached={setCached} cached={cached}/>
    )
  }

}

export default App;
