import { useHistory } from 'react-router-dom';
import { camelizeKeys } from 'humps';

import { createTable } from 'api';

export const useSubmitFormData = () => {
  const history = useHistory();

  const onSubmitFormData = async (formData: any) => {
    const response = await createTable(formData);
    const { tableId }: any = camelizeKeys(response.data);
    history.push(`/tables/${tableId}`);
  };

  return onSubmitFormData;
};
