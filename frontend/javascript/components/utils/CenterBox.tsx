import * as React from 'react';

import { Box } from '@material-ui/core';

type Props = {
  children: React.ReactNode;
};

export const CenterBox = React.memo(({ children, ...props }: Props) => {
  return (
    <Box position="absolute" top="50%" left="50%" style={{ transform: 'translate(-50%, -50%)' }} {...props}>
      {children}
    </Box>
  );
});
