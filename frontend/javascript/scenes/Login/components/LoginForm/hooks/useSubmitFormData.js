import { debugLogin } from 'api';

const useSubmitFormData = () => {
  const onSubmitFormData = async formData => {
    await debugLogin(formData);

    const redirectTo = sessionStorage.getItem('redirectTo');
    sessionStorage.removeItem('redirectTo');
    window.location = redirectTo || `/`;
  };

  return onSubmitFormData;
};

export default useSubmitFormData;
