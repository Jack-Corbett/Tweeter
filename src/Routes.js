import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import Login from './containers/Login';
import Register from './containers/Register';
import Timeline from './containers/Timeline';
import Post from './containers/Post';
import Following from './containers/Following';
import Followers from './containers/Followers';
import NotFound from './containers/NotFound';

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path='/' exact component={Login} appProps={appProps} />
      <AppliedRoute path='/register' exact component={Register} appProps={appProps} />
      <AppliedRoute path='/timeline' exact component={Timeline} appProps={appProps} />
      <AppliedRoute path='/post' exact component={Post} appProps={appProps} />
      <AppliedRoute path='/following' exact component={Following} appProps={appProps} />
      <AppliedRoute path='/followers' exact component={Followers} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}