import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { urlRegExp } from 'shared/utils/helpers';
import { industriesSelectOptions, occupationsSelectOptions } from 'screens/my-account/utils';
import Modal from 'shared/components/Modal';
import Alert from 'shared/components/Alert';
import AvatarUploader from 'shared/components/AvatarUploader';
import InputTextField from 'shared/components/InputTextField';
import InputSelectField from 'shared/components/InputSelectField';
import Button from 'shared/components/Button';
import Link from 'shared/components/Link';
import ExclamationSvg from 'shared/components/svg/ExclamationSvg';
import LinkSvg from 'shared/components/svg/LinkSvg';
import avatarPlaceholderImg from 'screens/sessions/images/account-requirements/avatar-placeholder.png';

const AccountRequirementsModal = ({ isOpen, closeHandler, onConfirm, user }) => {
  const initialValues = {
    image: '',
    workCompany: user.workCompany || '',
    workIndustry: user.workIndustry || '',
    workOccupation: user.workOccupation || '',
    instagramUsername: user.instagramUsername || '',
    links: user.links || [],
    newLink: '',
  };

  const validationSchema = Yup.object().shape({
    image: user.imageUrl ? null : Yup.string().required('Required'),
    workCompany: Yup.string().required('Required'),
    workIndustry: Yup.string().required('Required'),
    workOccupation: Yup.string().required('Required'),
    instagramUsername: Yup.string().when('links', {
      is: (links) => links.length === 0,
      then: (schema) => schema.required('Required'),
      otherwise: null,
    }),
    links: Yup.array(),
    newLink: Yup.string().when(['instagramUsername', 'links'], {
      is: (instagramUsername, links) => !instagramUsername && links.length === 0,
      then: (schema) => schema.transform(() => '').required('Required'),
      otherwise: null,
    }),
  });

  const addNewLink = (formValues, setFieldValue, setFieldError) => {
    const { newLink, links } = formValues;

    if (!urlRegExp.test(newLink)) {
      setFieldError('newLink', 'Invalid link format');
      return;
    }

    setFieldValue('links', [...links, newLink]);
    setFieldValue('newLink', '');
    setFieldError('newLink', null);
  };

  const removeLink = (formValues, setFieldValue, linkToRemove) => {
    const { links } = formValues;
    setFieldValue(
      'links',
      links.filter((link) => link !== linkToRemove)
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      closeHandler={closeHandler}
      title="Tell us more about yourself"
      size="2xl"
    >
      <Alert variant="warning" showIcon={false} className="mb-4">
        In order to book your session, please complete your missing information.
      </Alert>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onConfirm}
        enableReinitialize
      >
        {({ values, setFieldValue, setFieldError }) => (
          <Form>
            <AvatarUploader
              name="image"
              img={user.imageUrl}
              placeholderImg={avatarPlaceholderImg}
              description="Please upload a high-resolution, recent profile picture featuring a professional, close-range photo of you."
              className="mb-8"
            />
            <InputTextField label="Where do you work*" name="workCompany" className="mb-4" />
            <InputSelectField
              label="Industry*"
              name="workIndustry"
              options={industriesSelectOptions()}
              className="mb-4"
            />
            <InputSelectField
              label="What do you do*"
              name="workOccupation"
              options={occupationsSelectOptions(values.workIndustry)}
              className="mb-4"
            />
            <InputTextField
              label="Instagram Profile*"
              name="instagramUsername"
              icon="@"
              leftIcon
              className="mb-8"
            />
            <div className="flex items-center text-xs mb-8">
              <ExclamationSvg className="w-4 mr-2" />
              If you don't have an Instagram account, 1 other social link is required
            </div>
            {values.links.length > 0 && (
              <div className="mb-4">
                {values.links.map((link, index) => (
                  <div key={index} className="flex items-center text-sm mb-1">
                    <LinkSvg className="w-5 mr-2" />
                    {link}
                    <Link
                      variant="purple-dark"
                      onClick={() => removeLink(values, setFieldValue, link)}
                      className="text-xs ml-2"
                    >
                      Remove
                    </Link>
                  </div>
                ))}
              </div>
            )}
            <InputTextField
              label="Any other links"
              name="newLink"
              icon={<LinkSvg className="w-5" />}
              leftIcon
              className="mb-2"
            />
            <div className="mb-6">
              <Button
                variant="outline-black"
                size="sm"
                disabled={values.newLink.length === 0}
                onClick={() => addNewLink(values, setFieldValue, setFieldError)}
              >
                Add
              </Button>
            </div>
            <div>
              <Button type="submit">Save</Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

AccountRequirementsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
};

export default AccountRequirementsModal;
