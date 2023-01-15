import * as React from 'react';

import { Box } from '@material-ui/core';

import { CreateTableForm } from 'components/form/CreateTableForm';

export const Lobby = () => {
  return (
    <Box display="flex" flexDirection="column" textAlign="center">
      <Box bgcolor="grey.50" width="50%" m="auto" mt={4} py={4} borderRadius={8}>
        <CreateTableForm />
      </Box>
    </Box>
  );
};
