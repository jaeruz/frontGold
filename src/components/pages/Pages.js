import React from 'react'
import { Route, Switch } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import AddItem from './items/AddItem';
import ISR from './process/ISR/ISR';

function Pages({sidebar}) {
    return (
        <div className={sidebar ? 'main-container-active' : 'main-container'}>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/items/add" component={AddItem} />

                <Route exact path="/process/isr" component={ ISR }/>
            </Switch>
        </div>
    )
}

export default Pages
