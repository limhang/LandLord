import React from 'react';
import { Router, Route } from 'dva/router';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import GameHall from './routes/gameHall/GameHall';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/gameHall" component={GameHall}/>
    </Router>
  );
}

export default RouterConfig;
