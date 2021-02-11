/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Redirect, Route, RouteProps, useLocation,
} from 'react-router';

import { meAction } from '@/store/actions/auth';
import { selectAuthUser } from '@/store/selectors/auth';

import { getAccessToken, getRefreshToken } from '@/utils/tokens';

interface Props extends RouteProps {}

const PrivateRoute: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [allowRender, setAllowRender] = React.useState(false);

  const user = useSelector(selectAuthUser);

  const renderComponent = React.useCallback(() => (
    (
      <Redirect
        to={{
          pathname: '/sign-in',
          state: { from: location },
        }}
      />
    )
  ), [location]);

  const isAuthorized = React.useMemo(() => Boolean(user), [user]);

  React.useEffect(() => {
    const start = async () => {
      try {
        if (!user && getAccessToken() && getRefreshToken()) {
          await dispatch(meAction());
        }
      } catch (e) {
        console.error(e);
      } finally {
        setAllowRender(true);
      }
    };

    start();
  }, [dispatch, user]);

  if (isAuthorized && allowRender) {
    return <Route {...props} />;
  }

  if (allowRender) {
    return <Route {...props} component={renderComponent} />;
  }

  return null;
};

export default PrivateRoute;
