import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { IUser } from '@/api/models/user';

import { selectAuthUser } from '@/store/selectors/auth';
import { zeroAuth } from '@/api/auth';
import { Button } from '@material-ui/core';

interface Props {}

const Home: React.FC<Props> = () => {
  const user = useSelector(selectAuthUser);

  const linkHandler = React.useCallback(async () => {
    const { data } = await zeroAuth();

    window.open(data.link, '_blank');
  }, []);

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

export default Home;
