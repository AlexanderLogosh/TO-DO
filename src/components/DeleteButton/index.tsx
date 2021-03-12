import React from 'react';
import {Box, IconButton} from "@material-ui/core";
import {DeleteForever} from "@material-ui/icons";

interface DeleteButtonProps {
  onClick: ()=>void
}

const DeleteButton = (props: DeleteButtonProps) => {

  return (
    <Box p={0.5} pl={0}>
      <IconButton size={'small'} {...props}>
        <DeleteForever />
      </IconButton>
    </Box>
  );
};

export default DeleteButton;