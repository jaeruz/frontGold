import React from 'react'
import { Route, Switch } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import AddItem from './items/AddItem';
import BarcodeScan from './process/BarcodeScan.js/BarcodeScan';
import ISR from './process/ISR/ISR';
import PO from './process/PO/PO';

function Pages({sidebar}) {
    return (
        <div className={sidebar ? 'main-container-active' : 'main-container'}>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/items/add" component={AddItem} />

                <Route exact path="/process/isr" component={ISR} />
                <Route exact path="/process/scan" component={BarcodeScan} />

                <Route exact path="/process/po" component={ PO }/>
            </Switch>
        </div>
    )
}

export default Pages
