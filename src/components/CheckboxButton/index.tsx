import React from 'react';
import {Box, IconButton} from "@material-ui/core";

import {CheckBox, CheckBoxOutlineBlank} from "@material-ui/icons";

interface CheckboxProps {
  checked?: boolean;
  disabled? : boolean;
  onClick?: ()=>void;
}

const CheckboxButton = ({checked, ...props}: CheckboxProps) => {
  return (
    <Box p={0.5} pl={0}>
      <IconButton size={'small'} {...props}>
        {checked ? <CheckBox/> : <CheckBoxOutlineBlank/>}
      </IconButton>
    </Box>
  );
};

export default CheckboxButton;