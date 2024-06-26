import Button from '@/components/button';
import Field from '@/components/field';
import { IconEyeClose, IconEyeOpen } from '@/components/icon';
import Input from '@/components/input';
import Label from '@/components/label';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { NavLink, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import AuthPage from './AuthPage';

const schema = yup.object({
  fullname: yup.string().required('Please enter your fullname !'),
  email: yup.string().email('Please enter valid email address !').required('Please enter your email address !'),
  password: yup.string().min(8, 'Your password must be at least 8 characters or greater !'),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleSignUp = async values => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    const colRef = collection(db, 'users');
    await addDoc(colRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    });
    toast.success('Register successfully !');
    navigate('/');
  };
  const [togglePassword, setTogglePassword] = useState(false);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0].message);
    }
  }, [errors]);
  return (
    <AuthPage>
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
        <div className="have-account">
          You already have an account? <NavLink to={'/sign-in'}>Sign In</NavLink>
        </div>
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
    </AuthPage>
  );
};

export default SignUpPage;
