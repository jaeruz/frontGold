import React from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { SideBarDataAdmin,SideBarDataStaff } from './SideBarData'
import {IconContext} from 'react-icons'
import SideBarMenu from './SideBarMenu'

function MyNavbar({sidebar,setSidebar,isAdmin,setIsAdmin}) {

    const showSidebar=()=>setSidebar(!sidebar)
    return (
        <>
        <IconContext.Provider value={{color:'white'}}>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
                    
                    {isAdmin ?
                        <div onClick={()=>{setIsAdmin(!isAdmin)}}>
                            <FaIcons.FaUserTie style={{ fontSize: "30px"}} /> 
                            <span style={{color:"white", marginRight: "10px" }}>Admin</span>
                        </div>
                        :
                        <div onClick={()=>{setIsAdmin(!isAdmin)}}>
                            <FaIcons.FaUserInjured style={{ fontSize: "30px"}} /> 
                            <span style={{color:"white", marginRight: "10px" }}>Staff</span>
                        </div>
                    }
                        
                
            </div>
            
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    {/* <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose onClick={showSidebar}/>
                        </Link>
                    </li> */}
                    {isAdmin ? SideBarDataAdmin.map((item, index) => {
                        return (
                           <SideBarMenu item={item} key={index}/>
                        )
                    }): SideBarDataStaff.map((item, index) => {
                        return (
                           <SideBarMenu item={item} key={index}/>
                        )
                    })
                                
                    }
                    {/* {SideBarDataAdmin.map((item, index) => {
                        return (
                           <SideBarMenu item={item} key={index}/>
                        )
                    })} */}
                </ul>
            </nav>
        </IconContext.Provider>
        </>
    )
}

export default MyNavbar
