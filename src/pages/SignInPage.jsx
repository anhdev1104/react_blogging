import { AuthContext } from '@/contexts/authContext';
import { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthPage from './AuthPage';
import { useForm } from 'react-hook-form';
import Field from '@/components/field';
import Input from '@/components/input';
import Label from '@/components/label';
import Button from '@/components/button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import InputPasswordToggle from '@/components/input/InputPasswordToggle';

const schema = yup.object({
  email: yup.string().email('Please enter valid email address !').required('Please enter your email address !'),
  password: yup.string().min(8, 'Your password must be at least 8 characters or greater !'),
});

const SignInPage = () => {
  const { userInfo } = useContext(AuthContext);
  console.log('🚀 ~ SignInPage ~ userInfo:', userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?.email) {
      toast.info('You are already logged in. Do you want to logout and login again?');
      navigate('/');
    }
  }, [navigate, userInfo]);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
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
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          You have not had an account? <NavLink to={'/sign-up'}>Sign Up</NavLink>
        </div>
        <Button
          type="submit"
          style={{
            width: '100%',
            maxWidth: 300,
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
