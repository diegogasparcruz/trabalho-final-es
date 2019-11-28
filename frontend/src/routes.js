import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './login/index.js'
import Home from './home/index.js'


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/home' component={Home} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes