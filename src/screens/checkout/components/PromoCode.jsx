import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import styled from 'styled-components';

import InputTextField from 'shared/components/InputTextField';
import Spinner from 'shared/components/Spinner';
import Button from 'shared/components/Button';
import device from 'shared/styles/mediaQueries';

import { checkPromoCode } from '../actionCreators';
import { getPromoCodeLoading, getPromoCodeValid } from '../reducer';

const PromoCodeContainer = styled.div`
  form {
    display: flex;
    align-items: center;
  }

  button {
    height: 100%;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    padding: 1rem 2rem;
    align-self: flex-end;
    width: 9rem;
  }

  .success-msg {
    font-weight: 500;
    margin-top: 1rem;
    margin-left: 0.5rem;
  }

  .input-container {
    width: 50%;
    margin-bottom: 0;
    font-size: 1rem;

    input {
      padding: 0.85rem 0.5rem;
    }
    label {
      font-weight: bold;
      font-size: 0.9rem;
      line-height: 0.9rem;
      letter-spacing: 0.2em;
      color: #aaaff3;
      margin-bottom: 0.8rem;
      text-transform: capitalize;
    }
    small {
      display: none;
    }
  }
  @media ${device.mobile} {
    form {
      flex-direction: row;
      button {
        margin-left: 1rem;
        padding: 0.9rem;
      }
    }
    .input-container {
      width: 55%;
      input {
        font-size: 1rem;
      }
    }
  }
`;

const PromoCode = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getPromoCodeLoading);
  const isPromoCodeValid = useSelector(getPromoCodeValid);
  const checkPromoCodeAction = promoCode => dispatch(checkPromoCode(promoCode));

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
      onSubmit={({ promoCode }) => {
        checkPromoCodeAction(promoCode);
      }}
      validationSchema={validationSchema}
    >
      {() => (
        <PromoCodeContainer className="promo-code">
          <Form className="form">
            <InputTextField
              labelText="DISCOUNT CODE"
              name="promoCode"
              placeholder="Enter your code"
              className="input-container"
              disabled={isPromoCodeValid}
            />
            {isPromoCodeValid ? (
              <span className="success-msg">DISCOUNT ADDED!</span>
            ) : (
              <Button className="use-code-button ar-button" type="submit" disabled={isLoading}>
                <div className="ar-button-inner">{!isLoading ? 'USE CODE' : <Spinner />}</div>
              </Button>
            )}
          </Form>
        </PromoCodeContainer>
      )}
    </Formik>
  );
};

export default PromoCode;
