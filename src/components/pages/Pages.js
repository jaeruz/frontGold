import React, { useEffect,useState } from 'react'
import { Route, Switch,withRouter } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import AddItem from './items/AddItem';
import PageUnavailable from './home/PageUnavailable'
import Home from './home/Home'
import BarcodeScan from './process/BarcodeScan.js/BarcodeScan';
import ISR from './process/ISR/ISR';
import PO from './process/PO/PO';
import SignIn from '../auth/SignIn';
import ViewItems from './items/ViewItems';

function Pages({ sidebar,history }) {
    
    const [cachedCreds, setCachedCreds] = useState(null)


    history.listen((location, action) => {
        // console.log(history)
        const cacheCreds = JSON.parse(window.localStorage.getItem("credentials"))
        setCachedCreds(cacheCreds)
    })

    useEffect(() => {
        const cacheCreds = JSON.parse(window.localStorage.getItem("credentials"))
        setCachedCreds(cacheCreds)
    }, [])

    return (
        <div className={sidebar ? 'main-container-active' : 'main-container'}>
            {cachedCreds ? 
                (
                    <Switch>
                        <Route exact path="/" component={ cachedCreds.is_Admin ? Dashboard : Home} />
                        <Route exact path="/items/add" component={cachedCreds.is_Admin ? AddItem : PageUnavailable} />
                        <Route exact path="/items" component={cachedCreds.is_Admin ? ViewItems : PageUnavailable } />

                        <Route exact path="/process/isr" component={cachedCreds.is_Admin ? PageUnavailable : ISR} />
                        {/* <Route exact path="/signin" component={cachedCreds ? PageUnavailable :  SignIn } /> */}
                        <Route exact path="/process/scan" component={cachedCreds.is_Admin ? PageUnavailable : BarcodeScan} />

                        <Route exact path="/process/po" component={cachedCreds.is_Admin ? PageUnavailable : PO} />
                        
                        <Route exact path="/adminpage" component={cachedCreds.is_Admin ? (() => {
                            window.location.href = 'http://localhost:8000/admin';
                            return <h4>Session Expired</h4>;
                        }) : PageUnavailable} />
                    </Switch>
                )
                :
                <p>Loading..</p>
            }
            
        </div>
    )
}

export default withRouter(Pages)
