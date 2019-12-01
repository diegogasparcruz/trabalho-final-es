import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './login/index.js'
import Home from './home/index.js'
import Project from './project/index.js'
import User from './user/index.js'


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/home' component={Home} />
                <Route exact path='/project/:id' component={Project} />
                <Route exact path='/user/:id' component={User} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes