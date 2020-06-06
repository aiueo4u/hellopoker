import { useHistory } from 'react-router-dom';
import { camelizeKeys } from 'humps';

import { createTable } from 'api';

const useSubmitFormData = () => {
  const history = useHistory();

  const onSubmitFormData = async formData => {
    const response = await createTable(formData);
    const { tableId } = camelizeKeys(response.data);
    history.push(`/tables/${tableId}`);
  };

  return onSubmitFormData;
};

export default useSubmitFormData;
