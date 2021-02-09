import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { IUser } from '@/api/models/user';

import { selectAuthUser } from '@/store/selectors/auth';
import { zeroAuth } from '@/api/auth';

interface Props {}

const Home: React.FC<Props> = () => {
  // const [link, setLink] = React.useState('');

  const user = useSelector(selectAuthUser);

  const handler = React.useCallback(async () => {
    console.log(await zeroAuth());
  }, []);

  // React.useEffect(() => {
  //   const start = async () => {
  //     const { data } = await zeroAuth();

  //     setLink(data);
  //   };

  //   start();
  // }, []);

  if (!user) return null;

  return (
    <HomeStyled>
      {Object.keys(user).map((key) => (
        <li>
          {key}
          :
          {' '}
          {user[key as keyof IUser]}
        </li>
      ))}
      <button onClick={handler}>Go to zero5</button>
    </HomeStyled>
  );
};

const HomeStyled = styled.div``;

export default Home;
