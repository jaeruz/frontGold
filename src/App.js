import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import MyNavbar from "./components/layout/MyNavbar";
import Pages from "./components/pages/Pages";


function App() {
  const [sidebar, setSidebar] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  return (
    <>
      <BrowserRouter>
        <MyNavbar sidebar={sidebar} setSidebar={setSidebar} isAdmin={isAdmin} setIsAdmin={ setIsAdmin}/>
        <Pages sidebar={sidebar} setSidebar={setSidebar}/>
      </BrowserRouter>
    </>
  );
}

export default App;
