import React, { useEffect, useState } from "react";
import { Route, Switch, Router, Redirect } from "react-router-dom";

import { createBrowserHistory } from "history";

import task1 from '../Container/task1/index'
import task2 from '../Container/task2/index'
const history = createBrowserHistory();

const AppRouter = () => {

    return (

        <Router history={history}>

        <Switch>

            <Route path={["/", '/task1']} exact component={task1} />

            <Route path={['/task2']} exact component={task2} />

        </Switch>

        </Router>


    )

}

export default AppRouter;