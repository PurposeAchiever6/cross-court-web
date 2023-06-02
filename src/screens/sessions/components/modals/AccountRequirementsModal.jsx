import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { urlRegExp } from 'shared/utils/helpers';
import { industriesSelectOptions, SELECT_OTHER_VALUE } from 'screens/my-account/utils';
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
  const otherIndustrySelected =
    user.workIndustry &&
    industriesSelectOptions().filter((option) => option.value === user.workIndustry).length === 0;

  const initialValues = {
    image: '',
    workCompany: user.workCompany || '',
    workIndustry: otherIndustrySelected ? SELECT_OTHER_VALUE : user.workIndustry || '',
    otherWorkIndustry: otherIndustrySelected ? user.workIndustry : '',
    workOccupation: user.workOccupation || '',
    instagramUsername: user.instagramUsername || '',
    links: user.links || [],
    newLink: '',
  };

  const validationSchema = Yup.object().shape({
    image: user.imageUrl ? null : Yup.string().required('Required'),
    workCompany: Yup.string()
      .required('Required')
      .min(3, 'Should be at least 3 characters')
      .max(20, 'Should be at most 20 characters'),
    workIndustry: Yup.string().required('Required'),
    otherWorkIndustry: Yup.string().when('workIndustry', {
      is: (workIndustry) => workIndustry === SELECT_OTHER_VALUE,
      then: (schema) =>
        schema
          .required('Required')
          .min(4, 'Should be at least 4 characters')
          .max(25, 'Should be at most 25 characters'),
      otherwise: null,
    }),
    workOccupation: Yup.string()
      .required('Required')
      .min(3, 'Should be at least 3 characters')
      .max(30, 'Should be at most 30 characters'),
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

  const handleOnConfirm = (values) => {
    const { workIndustry, otherWorkIndustry } = values;

    onConfirm({
      ...values,
      workIndustry: workIndustry === SELECT_OTHER_VALUE ? otherWorkIndustry : workIndustry,
    });
  };

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
        onSubmit={handleOnConfirm}
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
            <InputTextField label="Company name*" name="workCompany" className="mb-4" />
            <InputSelectField
              label="Industry*"
              name="workIndustry"
              options={industriesSelectOptions()}
              className="mb-4"
            />
            {values.workIndustry === SELECT_OTHER_VALUE && (
              <InputTextField name="otherWorkIndustry" variant="shrink" className="-mt-2 mb-4" />
            )}
            <InputTextField label="Job title*" name="workOccupation" className="mb-4" />
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
