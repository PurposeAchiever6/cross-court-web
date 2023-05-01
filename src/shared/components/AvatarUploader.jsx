import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';

import InputFileField from 'shared/components/InputFileField';
import Avatar from 'shared/components/Avatar';
import avatarPlaceholderImg from 'screens/onboarding/images/avatar-placeholder.jpeg';

const AvatarUploader = ({ name, img, description, error, className }) => {
  const { errors } = useFormikContext();
  const [avatarImg, setAvatarImage] = useState(avatarPlaceholderImg);

  const errorMsg = error || errors[name];

  useEffect(() => {
    if (img) {
      setAvatarImage(img);
    }
  }, [img]);

  return (
    <div className={className}>
      <div className="flex items-start md:items-center bg-cc-gray-400 p-6">
        <Avatar img={avatarImg} size="md" className="shrink-0 mr-8" />
        <div className="md:flex md:items-center">
          <InputFileField
            name={name}
            accept="image/*"
            variant="outline-purple"
            setPreview={setAvatarImage}
            showError={false}
            className="mb-4 md:mb-0 md:mr-8"
          />
          {description && <p className="text-xs md:text-sm">{description}</p>}
        </div>
      </div>
      {errorMsg && (
        <div className="font-shapiro45_welter_extd text-xs text-right text-red-500 mt-2">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

AvatarUploader.defaultProps = {
  img: null,
  description: null,
  error: null,
  className: '',
};

AvatarUploader.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default AvatarUploader;
