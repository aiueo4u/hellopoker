import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { camelizeKeys } from 'humps';

import { updatePlayer } from 'api';

const useProfileImageDialog = ({ closeDialog }) => {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreviewSrc, setProfileImagePreviewSrc] = useState(null);

  const clearState = () => {
    setUpdating(false);
    setProfileImageFile(null);
    setProfileImagePreviewSrc(null);
  };

  const onChange = event => {
    const file = event.target.files[0];
    const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
    setProfileImagePreviewSrc(createObjectURL(file));
    setProfileImageFile(file);
  };

  const onClose = () => {
    if (updating) return;
    closeDialog();
    clearState();
  };

  const onSubmit = async () => {
    setUpdating(true);

    const body = new FormData();
    body.append('player[profile_image]', profileImageFile);
    const updatedPlayer = await updatePlayer(body).then(response => camelizeKeys(response.data));
    dispatch({ type: 'UPDATE_PLAYER_SUCCEEDED', payload: { updatedPlayer } });

    closeDialog();
    clearState();
  };

  return { onChange, onClose, onSubmit, profileImageFile, profileImagePreviewSrc, updating };
};

export default useProfileImageDialog;
