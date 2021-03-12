import React from 'react';
import {Box, CircularProgress} from "@material-ui/core";

const Spinner = () => {

  return (
    <Box
      p={1}
      display={'flex'}
      alignItems={'center'}
      marginRight={1}>
      <CircularProgress size={24} />
    </Box>
  );
};

export default Spinner;