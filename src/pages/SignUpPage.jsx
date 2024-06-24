import Button from '@/components/button';
import Field from '@/components/field';
import { IconEyeClose, IconEyeOpen } from '@/components/icon';
import Input from '@/components/input';
import Label from '@/components/label';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const SignUpPageStyle = styled.div`
  min-height: 100vh;
  padding: 40px;
  .main-form {
    max-width: 700px;
    margin: 0 auto;
  }
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${props => props.theme.primary};
    font-weight: 600;
    font-size: 40px;
    margin-bottom: 60px;
  }
`;

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({});

  const handleSignUp = values => {
    if (!isValid) return;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  };
  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <SignUpPageStyle>
      <div className="container-page">
        <img srcSet="/logo.png 2x" alt="Logo Monkey Blogging" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
        <form className="main-form" onSubmit={handleSubmit(handleSignUp)} autoComplete="off">
          <Field>
            <Label htmlFor="fullname">Fullname</Label>
            <Input type="text" name="fullname" placeholder="Enter your fullname" control={control} />
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" placeholder="Enter your email" control={control} />
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              type={togglePassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              control={control}
            >
              {togglePassword ? (
                <IconEyeOpen onClick={() => setTogglePassword(false)} />
              ) : (
                <IconEyeClose onClick={() => setTogglePassword(true)} />
              )}
            </Input>
          </Field>
          <Button
            type="submit"
            style={{
              maxWidth: 350,
              margin: '0 auto',
            }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </SignUpPageStyle>
  );
};

export default SignUpPage;
