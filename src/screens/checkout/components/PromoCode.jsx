import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import styled from 'styled-components';

import InputTextField from 'shared/components/InputTextField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

import { checkPromoCode } from '../actionCreators';
import { getPromoCodeLoading, getPromoCodeValid } from '../reducer';

const PromoCodeContainer = styled.div`
  button {
    height: 100%;
    width: 6rem;
    .content {
      height: 100%;
      padding: 0.5rem 1rem;
    }
  }
`;

const PromoCode = () => {
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
        <Form>
          <PromoCodeContainer className="flex flex-col sm:items-center sm:flex-row h-16 mb-20 sm:mb-4">
            <InputTextField
              showLabel={false}
              name="promoCode"
              placeholder="Enter your code"
              className="mb-4 md:mb-0 md:mr-4"
              disabled={isPromoCodeValid}
              displayErrorMsg={false}
            />
            {isPromoCodeValid ? (
              <span className="success-msg">DISCOUNT ADDED!</span>
            ) : (
              <PrimaryButton type="submit" loading={isLoading}>
                USE <br /> CODE
              </PrimaryButton>
            )}
          </PromoCodeContainer>
        </Form>
      )}
    </Formik>
  );
};

export default PromoCode;
