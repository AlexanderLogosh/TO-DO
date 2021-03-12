import React from 'react';
import {Box, IconButton} from "@material-ui/core";
import {Edit} from "@material-ui/icons";

interface EditButtonProps {
  onClick: ()=>void;
  id: string;
}

const EditButton = (props: EditButtonProps) => {

  return (
    <Box p={0.5} pl={0}>
      <IconButton size={'small'} {...props}>
        <Edit />
      </IconButton>
    </Box>
  );
};

export default EditButton;