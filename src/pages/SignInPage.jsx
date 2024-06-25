import { AuthContext } from '@/contexts/authContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthPage from './AuthPage';
import { useForm } from 'react-hook-form';
import Field from '@/components/field';
import Input from '@/components/input';
import Label from '@/components/label';
import { IconEyeClose, IconEyeOpen } from '@/components/icon';
import Button from '@/components/button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';

const schema = yup.object({
  email: yup.string().email('Please enter valid email address !').required('Please enter your email address !'),
  password: yup.string().min(8, 'Your password must be at least 8 characters or greater !'),
});

const SignInPage = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.email) {
      navigate('/sign-in');
    } else {
      navigate('/');
    }
  }, [navigate, userInfo.email]);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const handleSignIn = async values => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    toast.success('Login successfully !');
    navigate('/');
  };

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0].message);
    }
  }, [errors]);
  return (
    <AuthPage>
      <form className="main-form" onSubmit={handleSubmit(handleSignIn)} autoComplete="off">
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
          Sign In
        </Button>
      </form>
    </AuthPage>
  );
};

export default SignInPage;
