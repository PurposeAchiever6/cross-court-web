import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import { confirmCodeOfConduct } from 'shared/utils/codeOfConduct';
import Modal from 'shared/components/Modal';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

export const CodeOfConductModal = ({ isOpen, closeHandler, onConfirm, userProfile }) => {
  const initialValues = {
    codeOfConductOne: false,
    codeOfConductTwo: false,
    codeOfConductThree: false,
  };

  const submitIsEnabled = (values) =>
    values.codeOfConductOne && values.codeOfConductTwo && values.codeOfConductThree;

  return (
    <Modal dark isOpen={isOpen} closeHandler={closeHandler} title="Code Of Conduct">
      <div className="text-white">
        <p className="text-sm mb-5">
          The Crosscourt experience is designed to enhance the physical and emotional wellbeing of
          our athletes. By following the code of conduct below, Crosscourt is able to create a safe,
          social, and stimulaitng environment for all our athletes.
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={() => {
            confirmCodeOfConduct(userProfile);
            onConfirm();
          }}
        >
          {({ handleSubmit, values, isSubmitting }) => (
            <div>
              <InputCheckboxField name="codeOfConductOne" className="mb-5">
                I acknowledge that in order to maintain a safe and uplifitng environment, trash
                talking, profanity, hostile comments, or any other form of aggressive verbal
                communication towards staff members, officials, opposing players, or teammates, will
                not be tolerated.
              </InputCheckboxField>
              <InputCheckboxField name="codeOfConductTwo" className="mb-5">
                I acknowledge that hard fouls, throwing the ball, excessive bodily contact, or any
                other form of aggressive physical behavior will not be tolerated.
              </InputCheckboxField>
              <InputCheckboxField name="codeOfConductThree" className="mb-8">
                I acknowledge that a violation of any of the acts above will result in one of the
                following: ejection, suspension, or ban from Crosscourt
              </InputCheckboxField>
              <div className="text-center">
                <PrimaryButton onClick={closeHandler} inverted bg="transparent" className="mr-2">
                  Deny
                </PrimaryButton>
                <PrimaryButton
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!submitIsEnabled(values)}
                  loading={isSubmitting}
                  className="ml-2"
                >
                  Accept
                </PrimaryButton>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

CodeOfConductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  userProfile: PropTypes.shape().isRequired,
};

export default CodeOfConductModal;
