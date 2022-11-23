import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import InputIncrementDecrement, { OPERATIONS } from 'shared/components/InputIncrementDecrement';
import ROUTES from 'shared/constants/routes';
import InputTextareaField from 'shared/components/InputTextareaField';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import InputRadioField from 'shared/components/InputRadioField';
import { getUser } from 'screens/auth/reducer';
import { updatePersonalInfo } from 'screens/auth/actionCreators';
import Loading from 'shared/components/Loading';

const numberRegex = /^[0-9\b]+$/;
const singleQuote = '’';
const doubleQuote = '”';

const validationSchema = Yup.object().shape({
  weight: Yup.string()
    .required('Required')
    .min(2)
    .test(
      'no-leading-zero',
      'Leading zero is not allowed',
      (value) => value && !value.startsWith('0')
    ),
  height: Yup.string()
    .required('Required')
    .test('is-valid', 'Please enter a valid value', (value) => value && !value.includes('_'))
    .test(
      'no-leading-zero',
      'Leading zero is not allowed',
      (value) => value && !value.startsWith('0')
    ),
  competitiveBasketballActivity: Yup.string().required('Required').min(5),
  currentBasketballActivity: Yup.string().required('Required').min(15),
  position: Yup.string().required('Required'),
});

const initialValues = {
  weight: '',
  height: '',
  competitiveBasketballActivity: '',
  currentBasketballActivity: '',
  position: '',
};

const AboutYourselfPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [allowedLoading, setAllowedLoading] = useState(true);

  useEffect(() => {
    if (location?.state?.from !== ROUTES.RATING) {
      history.push(ROUTES.HOME);
    } else {
      setAllowedLoading(false);
    }
  }, [location, history]);

  const updatePersonalInfoAction = (personalInfo) =>
    dispatch(updatePersonalInfo({ personalInfo, from: ROUTES.ABOUT_YOURSELF }));

  const firstName = useSelector(getUser)?.firstName;

  const onWeightClick = (operation, setFieldValue) => {
    if (weight === '') {
      setWeight('0');
      setFieldValue('weight', '0');
      return;
    }

    const weightNumber = parseInt(weight, 10);
    let val;
    if (operation === OPERATIONS.PLUS) {
      val = (weightNumber + 1).toString();
    } else {
      if (weightNumber === 0) return;
      val = (weightNumber - 1).toString();
    }
    setWeight(val);
    setFieldValue('weight', val);
  };

  const onHeightClick = (operation, setFieldValue) => {
    if (height === '') {
      const val = `0${singleQuote}00${doubleQuote}`;
      setHeight(val);
      setFieldValue('height', val);
      return;
    }

    const heightNumber = parseInt(height[0], 10);
    let val;
    if (operation === OPERATIONS.PLUS) {
      val = `${heightNumber + 1}${singleQuote}00${doubleQuote}`;
    } else {
      if (heightNumber === 0) return;
      val = `${heightNumber - 1}${singleQuote}00${doubleQuote}`;
    }
    setHeight(val);
    setFieldValue('height', val);
  };

  const onWeightChange = (e, setFieldValue) => {
    const { value } = e.target;

    if (value === '' || numberRegex.test(value)) {
      setWeight(value);
      setFieldValue('weight', value);
    }
  };

  const onHeightChange = (e, setFieldValue) => {
    const { value } = e.target;

    const inches = `${value[2]}${value[3]}`;

    if (!inches.includes('_')) {
      if (parseInt(inches, 10) > 11) {
        const val = `${parseInt(value[0], 10) + 1}${singleQuote}00${doubleQuote}`;
        setHeight(val);
        setFieldValue('height', val);
        return;
      }
    }

    setHeight(value);
    setFieldValue('height', value);
  };

  const handleSubmit = (values) => {
    const formattedHeight = height.replace(singleQuote, '').replace(doubleQuote, '');

    const personalInfo = {
      ...values,
      weight,
      height: formattedHeight,
    };

    updatePersonalInfoAction(personalInfo);
  };

  if (allowedLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-0 md:py-8">
      {firstName && (
        <p className="font-shapiro95_super_wide uppercase md:text-3xl">Hey {firstName},</p>
      )}
      <p className="font-shapiro96_inclined_wide uppercase md:text-3xl mt-2 md:mt-6 mb-8 md:mb-12">
        Tell us about yourself!
      </p>
      <div className="flex flex-col justify-center">
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, errors, setFieldValue }) => (
            <Form>
              <InputIncrementDecrement
                name="weight"
                value={weight}
                onClick={(operation) => onWeightClick(operation, setFieldValue)}
                onChange={(e) => onWeightChange(e, setFieldValue)}
                maxLength="3"
                placeholder="27"
                className="mb-4"
                error={errors.weight}
              />
              <InputIncrementDecrement
                name="height"
                value={height}
                onClick={(operation) => onHeightClick(operation, setFieldValue)}
                onChange={(e) => onHeightChange(e, setFieldValue)}
                maxLength="6"
                placeholder={`5${singleQuote}10${doubleQuote}`}
                className="mb-8"
                mask={`9${singleQuote}99${doubleQuote}`}
                error={errors.height}
              />
              <p className="mb-4">What is your highest level of competitive basketball played?</p>
              <InputTextareaField
                name="competitiveBasketballActivity"
                placeholder="Ex Varsity, Foxwood High School 2010-2012"
                className="text-white my-5"
                hint="Please provide at least 5 characters"
              />
              <p className="mb-4">
                What is your current basketball activity? Where do you hoop? How often?
              </p>
              <InputTextareaField
                name="currentBasketballActivity"
                placeholder="Ex Equinox, twice a week for 2 hours"
                className="text-white my-5"
                hint="Please provide at least 15 characters"
              />
              <p className="mb-4">What is your preferred position?</p>
              <div role="group" aria-labelledby="checkbox-group" className="mb-10">
                <InputRadioField value="point_guard" name="position" className="mb-1">
                  Point Guard
                </InputRadioField>
                <InputRadioField value="shooting_guard" name="position" className="mb-1">
                  Shooting Guard
                </InputRadioField>
                <InputRadioField value="small_forward" name="position" className="mb-1">
                  Small Forward
                </InputRadioField>
                <InputRadioField value="power_forward" name="position" className="mb-1">
                  Power Forward
                </InputRadioField>
                <InputRadioField value="center" name="position" className="mb-1">
                  Center
                </InputRadioField>
              </div>
              <div className="text-center">
                <PrimaryButton type="submit" loading={isSubmitting} className="mb-14">
                  NEXT
                </PrimaryButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AboutYourselfPage;
