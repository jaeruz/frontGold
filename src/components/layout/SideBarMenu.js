import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

function SideBarMenu({ item ,setSidebar,sidebar}) {
    
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    useEffect(() => {
        console.log(subnav)
    }, [subnav])
    return (
        <li >
            <Link to={item.path} className={item.class_name} onClick={item.subNav && showSubnav}>
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
                    return (
                        <Link to={item.path} key={index} className="sub-links" >
                        {item.icon}
                        <span>{item.title}</span>
                        </Link>
                    );
                })
            }
        </li>
    )
}

export default SideBarMenu
