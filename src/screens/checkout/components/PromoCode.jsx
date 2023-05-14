import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { setPromoCodeInit, removePromoCodeInit } from 'screens/checkout/actionCreators';
import { getPromoCodeLoading, getPromoCodeApplied } from 'screens/checkout/reducer';
import InputTextField from 'shared/components/InputTextField';
import Button from 'shared/components/Button';
import Link from 'shared/components/Link';
import CheckSvg from 'shared/components/svg/CheckSvg';

const PromoCode = ({ product, className }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getPromoCodeLoading);
  const promoCodeApplied = useSelector(getPromoCodeApplied);
  const promoCode = promoCodeApplied?.code;

  const initialValues = {
    promoCode: promoCode || '',
  };

  const validationSchema = Yup.object().shape({
    promoCode: Yup.string().required('Required'),
  });

  const checkPromoCode = ({ promoCode }) => {
    dispatch(setPromoCodeInit({ promoCode, product }));
  };

  const removePromoCode = (setFieldValue) => {
    setFieldValue('promoCode', '');
    dispatch(removePromoCodeInit());
  };

  return (
    <div className={className}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={checkPromoCode}
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form>
            <InputTextField name="promoCode" label="Promo code" className="mb-4" />
            {promoCodeApplied ? (
              <div className="flex items-center">
                <CheckSvg className="w-4 mr-2" />
                <span className="text-sm mr-3">Code Applied</span>
                <Link
                  variant="purple-dark"
                  onClick={() => removePromoCode(setFieldValue)}
                  className="text-sm"
                >
                  Remove
                </Link>
              </div>
            ) : (
              <Button type="submit" size="sm" variant="outline-black" loading={isLoading}>
                Add Code
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

PromoCode.defaultProps = {
  product: null,
  className: '',
};

PromoCode.propTypes = {
  product: PropTypes.shape(),
  className: PropTypes.string,
};

export default PromoCode;
