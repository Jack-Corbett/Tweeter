import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
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
            <UnauthenticatedRoute path='/' exact component={Login} appProps={appProps} />
            <UnauthenticatedRoute path='/register' exact component={Register} appProps={appProps} />
            <AuthenticatedRoute path='/timeline' exact component={Timeline} appProps={appProps} />
            <AuthenticatedRoute path='/post' exact component={Post} appProps={appProps} />
            <AuthenticatedRoute path='/following' exact component={Following} appProps={appProps} />
            <AuthenticatedRoute path='/followers' exact component={Followers} appProps={appProps} />
            <Route component={NotFound} />
        </Switch>
    );
}