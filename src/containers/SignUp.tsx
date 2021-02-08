import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

import useForm from '@/utils/hooks/useForm';
import { signUp } from '@/api/auth';

const SignUp: React.FC = () => {
  const [data, setData] = useForm({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signUp(data);
  }, [data]);

  return (
    <Page>
      <Wrapper onSubmit={handleSubmit}>
        <TextField value={data.name} onChange={setData('name')} label="Name" variant="filled" color="primary" />
        <TextField value={data.email} onChange={setData('email')} label="Email" type="email" name="email" autoComplete="on" variant="filled" color="primary" />
        <TextField value={data.password} onChange={setData('password')} label="Password" type="password" variant="filled" color="primary" />
        <TextField value={data.phoneNumber} onChange={setData('phoneNumber')} label="Phone Number" type="number" variant="filled" color="primary" />
        <SubmitButton variant="contained" color="primary" type="submit">Sign Up</SubmitButton>
        <TextWrapper>
          <span>Already have an account?</span>
          {' '}
          <Link to="/sign-in">Sign In</Link>
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

export default SignUp;
