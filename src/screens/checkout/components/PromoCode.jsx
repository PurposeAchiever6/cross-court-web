import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import InputTextField from 'shared/components/InputTextField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

import { checkPromoCode } from '../actionCreators';
import { getPromoCodeLoading, getPromoCodeValid } from '../reducer';

const PromoCode = ({ className }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getPromoCodeLoading);
  const isPromoCodeValid = useSelector(getPromoCodeValid);
  const checkPromoCodeAction = (promoCode) => dispatch(checkPromoCode(promoCode));

  const initialValues = {
    promoCode: '',
  };

  const validationSchema = Yup.object().shape({
    promoCode: Yup.string().required('Required'),
  });

  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      onSubmit={({ promoCode }) => checkPromoCodeAction(promoCode)}
      validationSchema={validationSchema}
    >
      {() => (
        <Form className={className}>
          <div className="flex flex-col sm:flex-row">
            <InputTextField
              labelText="Discount Code"
              name="promoCode"
              placeholder="Enter your code"
              className="mb-4 sm:mb-0"
              disabled={isPromoCodeValid}
              displayErrorMsg={false}
            />
            {isPromoCodeValid ? (
              <span className="text-right text-sm sm:text-base sm:ml-2 sm:mt-12">
                DISCOUNT ADDED!
              </span>
            ) : (
              <PrimaryButton type="submit" loading={isLoading} className="self-end ml-4" py="15px">
                USE CODE
              </PrimaryButton>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

PromoCode.defaultProps = {
  className: '',
};

PromoCode.propTypes = {
  className: PropTypes.string.isRequired,
};

export default PromoCode;
