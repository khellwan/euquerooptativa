import React, { Fragment } from 'react';
import { PrivateLayout, PublicLayout, NotLoggedInLayout } from '@layouts';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import {
  Login,
  Register,
  PageNotFound,
  Welcome,
  RegistrationSuccess,
  Profile,
  GameList,
  GamePage
} from './containers';

const privateRoutes = [
  {
    id: 'inicio',
    path: '/inicio',
    component: Welcome
  },
  {
    id: 'perfil',
    path: '/perfil',
    component: Profile
  },
  {
    id: 'optativas',
    path: '/optativas',
    component: GameList
  },
  {
    id: 'tictactoegame',
    path: '/tictactoe/:gameId',
    component: GamePage
  }
];

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <NotLoggedInLayout component={Login} path="/login" exact />
        <NotLoggedInLayout component={Register} path="/register" exact />
        <NotLoggedInLayout path="/register/success" component={RegistrationSuccess} exact />
        <PublicLayout path="/404" component={PageNotFound} exact />
        <Redirect from="/" to="/welcome" exact />
        <PrivateLayout path="/" routes={privateRoutes} />
        <Redirect to="/404" />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
