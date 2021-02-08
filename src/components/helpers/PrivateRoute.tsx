/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Redirect, Route, RouteProps, useLocation,
} from 'react-router';

interface Props extends RouteProps {}

const PrivateRoute: React.FC<Props> = (props) => {
  const isAuthorized = false;
  const location = useLocation();

  const renderComponent = React.useCallback(() => (
    (
      <Redirect
        to={{
          pathname: '/sign-in',
          state: { from: location },
        }}
      />
    )
  ), [isAuthorized]);

  if (isAuthorized) {
    return <Route {...props} />;
  }

  return (
    <Route {...props} component={renderComponent} />
  );
};

export default PrivateRoute;
