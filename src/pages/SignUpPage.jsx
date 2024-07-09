import Button from '@/components/button';
import Field from '@/components/field';
import Input from '@/components/input';
import InputPasswordToggle from '@/components/input/InputPasswordToggle';
import Label from '@/components/label';
import { auth, db } from '@/firebase/config';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import * as yup from 'yup';
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
    resolver: yupResolver(schema),
  });

  const handleSignUp = async values => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        'https://images.unsplash.com/photo-1719216323962-ea9b315ad9bd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    });
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      avatar:
        'https://images.unsplash.com/photo-1719216323962-ea9b315ad9bd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 1,
      role: 3,
      createdAt: serverTimestamp(),
    });

    toast.success('Register successfully !');
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
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          You already have an account? <NavLink to={'/sign-in'}>Sign In</NavLink>
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
          Sign Up
        </Button>
      </form>
    </AuthPage>
  );
};

export default SignUpPage;
