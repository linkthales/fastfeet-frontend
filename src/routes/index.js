import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Delivery from '~/pages/Delivery';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/delivery" component={Delivery} isPrivate />
      <Route path="/lulu" component={Delivery} isPrivate />

      <Route path="/" component={() => <h1>404 - Página não existe</h1>} />
    </Switch>
  );
}
