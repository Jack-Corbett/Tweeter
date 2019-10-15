import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import Welcome from './containers/Welcome';
import Timeline from './containers/Timeline';
import Following from './containers/Following';
import NotFound from './containers/NotFound';

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path='/' exact component={Welcome} appProps={appProps} />
      <AppliedRoute path='/timeline' exact component={Timeline} appProps={appProps} />
      <AppliedRoute path='/following' exact component={Following} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}