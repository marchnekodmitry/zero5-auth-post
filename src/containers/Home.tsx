import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

import { IUser } from '@/api/models/user';
import { zeroAuth } from '@/api/auth';

import { logoutAction } from '@/store/actions/auth';
import { selectAuthUser } from '@/store/selectors/auth';

interface Props {}

const Home: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(selectAuthUser);

  const linkHandler = React.useCallback(async () => {
    const { data } = await zeroAuth();

    window.open(data.link, '_blank');
  }, []);

  const logoutHandler = React.useCallback(async () => {
    await dispatch(logoutAction());

    history.push('/sign-in');
  }, [dispatch, history]);

  if (!user) return null;

  return (
    <Page>
      <HomeStyled>
        {Object.keys(user).map((key) => (
          <li>
            {key}
            :
            {' '}
            {user[key as keyof IUser]}
          </li>
        ))}
        <StyledButton onClick={linkHandler} type="button" variant="outlined" fullWidth>Go to zero5</StyledButton>
        <LogoutButton onClick={logoutHandler} variant="outlined">Logout</LogoutButton>
      </HomeStyled>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const HomeStyled = styled.div``;

const StyledButton = styled(Button)`
  margin-top: 10px;
`;

const LogoutButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default Home;
