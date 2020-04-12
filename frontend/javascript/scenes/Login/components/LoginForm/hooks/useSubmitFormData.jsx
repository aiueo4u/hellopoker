import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { camelizeKeys } from 'humps'

import { debugLogin } from 'api';

const useSubmitFormData = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmitFormData = async formData => {
    const response = await debugLogin(formData)
    const { jwt, nickname, playerId } = camelizeKeys(response.data);
    localStorage.setItem('playerSession.jwt', jwt) // TODO
    dispatch({ type: 'LOGIN_FORM_ON_SUCCESS', nickname, playerId });
    history.push(`/`);
  };

  return onSubmitFormData;
};

export default useSubmitFormData;
