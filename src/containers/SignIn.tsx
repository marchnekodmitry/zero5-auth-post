import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';

import useForm from '@/utils/hooks/useForm';

import { signInAction } from '@/store/actions/auth';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    await dispatch(signInAction(data, history));

    setLoading(false);
  }, [data, dispatch, history]);

  return (
    <Page>
      <Wrapper onSubmit={handleSubmit}>
        <Typography variant="h2" align="center" color="primary">POST</Typography>
        <TextField value={data.email} onChange={setData('email')} label="Email" type="email" name="email" autoComplete="on" variant="filled" color="primary" />
        <TextField value={data.password} onChange={setData('password')} label="Password" type="password" variant="filled" color="primary" />
        <SubmitButton variant="contained" color="primary" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign In' }</SubmitButton>
        <TextWrapper>
          <span>Don&apos;t have an account?</span>
          {' '}
          <Link to="/sign-up">Sign Up</Link>
        </TextWrapper>
      </Wrapper>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const SubmitButton = styled(Button)`
  width: 200px;
  margin: 10px auto 0 auto;
`;

const TextWrapper = styled.div`
  margin-top: 10px;

  & > * {
    display: inline-block;
  }
`;

export default SignIn;
