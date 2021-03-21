import { debugLogin } from 'api';

export const useSubmitFormData = () => {
  const onSubmitFormData = async (formData: any) => {
    await debugLogin(formData);

    const redirectTo = sessionStorage.getItem('redirectTo') || `/`;
    sessionStorage.removeItem('redirectTo');
    window.location.href = redirectTo;
  };

  return onSubmitFormData;
};
