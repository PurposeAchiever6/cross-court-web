import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

const getQueryStringValue = (key) => queryString.parse(window.location.search)[key];

const setQueryStringValue = (history, key, value) => {
  const currentValues = queryString.parse(window.location.search);

  history.push({
    pathname: window.location.pathname,
    search: queryString.stringify(
      { ...currentValues, [key]: value },
      { skipNull: true, skipEmptyString: true }
    ),
  });
};

const useQueryString = (key, initialValue) => {
  const history = useHistory();

  const [value, setValue] = useState(getQueryStringValue(key) || initialValue);

  const onSetValue = useCallback(
    (newValue) => {
      setValue(newValue);
      setQueryStringValue(history, key, newValue);
    },
    [key, history]
  );

  return [value, onSetValue];
};

export default useQueryString;
