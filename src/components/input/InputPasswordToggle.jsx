import { useState } from 'react';
import { IconEyeClose, IconEyeOpen } from '../icon';
import Input from './Input';

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;

  return (
    <>
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
    </>
  );
};

export default InputPasswordToggle;
