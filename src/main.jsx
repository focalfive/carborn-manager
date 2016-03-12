import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import App from './jsx/app';

import Home from './jsx/views/home';
import List from './jsx/views/list';
import Car from './jsx/views/car';

const appHistory = useRouterHistory(createHashHistory)({queryKey: false});
const appId = 'IvBZLAh4TFKfiG7vewerHgZpuWAjNMHowGSg2PMZ';
const apiKey = 'kJbBe3wvZnh75A1GThWK15M27QomYQZhWxdIDTFO';

// Main method, Append to DOM
ReactDOM.render(
    <Router history={appHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="list" appId={appId} apiKey={apiKey} component={List} />
            <Route path="list/:parentId" appId={appId} apiKey={apiKey} component={List} />
            <Route path="car" component={Car} />
        </Route>
    </Router>,
    document.getElementById('main')
);