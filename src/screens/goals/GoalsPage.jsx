import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import InputCheckboxField from 'shared/components/InputCheckboxField';
import Loading from 'shared/components/Loading';
import { getUser } from 'screens/auth/reducer';
import { fetchGoals } from 'screens/goals/actionCreators';
import { getPageLoading, getGoals } from 'screens/goals/reducer';
import { updatePersonalInfo } from 'screens/auth/actionCreators';

const validationSchema = Yup.object().shape({
  goals: Yup.array().required('Please select a value'),
  mainGoal: Yup.string().required('Please select a value'),
});

const initialValues = {
  goals: [],
  mainGoal: '',
};

const AboutYourselfPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [allowedLoading, setAllowedLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const pageLoading = useSelector(getPageLoading);
  const goals = useSelector(getGoals);
  const firstName = useSelector(getUser)?.firstName;

  const groupedGoals = goals?.reduce((group, goal) => {
    const { category } = goal;
    group[category] = group[category] ?? [];
    group[category].push(goal);
    return group;
  }, {});

  const groupEntries = Object.entries(groupedGoals);

  useEffect(() => {
    if (location?.state?.from !== ROUTES.ABOUT_YOURSELF) {
      history.push(ROUTES.HOME);
    } else {
      setAllowedLoading(false);
    }
  }, [location, history]);

  const handleSubmit = (values) => {
    dispatch(updatePersonalInfo({ personalInfo: values, from: ROUTES.GOALS }));
  };

  if (allowedLoading || pageLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-0 md:py-8">
      {firstName && (
        <p className="font-shapiro95_super_wide uppercase md:text-lg">
          Thanks for providing that info {firstName},
        </p>
      )}
      <p className="uppercase md:text-lg">We've got one more question</p>
      <p className="font-shapiro95_super_wide uppercase md:text-lg mt-2 md:mt-6 mb-4">
        What are your goals for Crosscourt?
      </p>
      <div className="flex flex-col justify-center">
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, values, setFieldValue, errors }) => (
            <Form>
              {groupEntries.map(([category, goals]) => (
                <div key={category} className="mt-4">
                  <p className="font-shapiro96_inclined_wide uppercase mb-2 md:text-lg">
                    {category}
                  </p>
                  <div role="group" aria-labelledby="checkbox-group">
                    {goals.map((goal) => (
                      <InputCheckboxField
                        className="mb-1"
                        key={goal.id}
                        name="goals"
                        value={goal.description}
                        isGroup
                        hideError
                      >
                        {goal.description}
                      </InputCheckboxField>
                    ))}
                  </div>
                </div>
              ))}
              {errors.goals && (
                <p className="block text-xs text-right text-red-500">{errors.goals}</p>
              )}
              {values.goals.length > 0 && (
                <div className="mt-4">
                  <p className="font-shapiro95_super_wide mb-2">
                    Which of these selected goals is MOST important to you?
                  </p>
                  <div role="group" aria-labelledby="checkbox-group">
                    {values.goals.map((selectedGoal, i) => (
                      <InputCheckboxField
                        className="mb-1"
                        key={`selectedGoal-${i}`}
                        name="mainGoal"
                        value={values.mainGoal}
                        onChange={() => setFieldValue('mainGoal', selectedGoal)}
                        checked={values.mainGoal === selectedGoal}
                        formik={false}
                        hideError
                      >
                        {selectedGoal}
                      </InputCheckboxField>
                    ))}
                  </div>
                  {errors.mainGoal && (
                    <p className="block text-xs text-right text-red-500">{errors.mainGoal}</p>
                  )}
                </div>
              )}
              <div className="text-center my-10">
                <PrimaryButton type="submit" loading={isSubmitting} className="mb-14">
                  SUBMIT
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
