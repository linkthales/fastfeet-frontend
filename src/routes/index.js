import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Delivery from '~/pages/Delivery';
import Deliveryman from '~/pages/Deliveryman';
import Recipient from '~/pages/Recipient';
import Problem from '~/pages/Problem';
import ManageDelivery from '~/pages/ManageDelivery';
import ManageDeliveryman from '~/pages/ManageDeliveryman';
import ManageRecipient from '~/pages/ManageRecipient';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/delivery" exact component={Delivery} isPrivate />
      <Route path="/deliveryman" exact component={Deliveryman} isPrivate />
      <Route path="/recipient" exact component={Recipient} isPrivate />
      <Route path="/problem" exact component={Problem} isPrivate />

      <Route path="/delivery/:id" component={ManageDelivery} isPrivate />
      <Route path="/deliveryman/:id" component={ManageDeliveryman} isPrivate />
      <Route path="/recipient/:id" component={ManageRecipient} isPrivate />

      <Route path="/" component={() => <h1>404 - Página não existe</h1>} />
    </Switch>
  );
}
