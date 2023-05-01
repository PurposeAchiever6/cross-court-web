import React, { useState } from 'react';
import PropTypes from 'prop-types';

import InputTextField from 'shared/components/InputTextField';
import Eye from 'shared/components/svg/Eye';
import EyeClosed from 'shared/components/svg/EyeClosed';

const InputPasswordField = ({ allowShowPassword, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!allowShowPassword) {
    return <InputTextField {...props} type="password" />;
  }

  return (
    <InputTextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      icon={
        showPassword ? (
          <Eye onClick={() => setShowPassword(false)} className="cursor-pointer w-5" />
        ) : (
          <EyeClosed onClick={() => setShowPassword(true)} className="cursor-pointer w-5" />
        )
      }
      rightIcon
    />
  );
};

InputPasswordField.propTypes = {
  allowShowPassword: false,
};

InputPasswordField.propTypes = {
  allowShowPassword: PropTypes.bool,
};

export default InputPasswordField;
