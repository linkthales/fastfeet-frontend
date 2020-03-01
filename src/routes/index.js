import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Delivery from '~/pages/Delivery';
import Deliveryman from '~/pages/Deliveryman';
import Recipient from '~/pages/Recipient';
import Problem from '~/pages/Problem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/delivery" component={Delivery} isPrivate />
      <Route path="/deliveryman" component={Deliveryman} isPrivate />
      <Route path="/recipient" component={Recipient} isPrivate />
      <Route path="/problem" component={Problem} isPrivate />

      <Route path="/" component={() => <h1>404 - Página não existe</h1>} />
    </Switch>
  );
}
