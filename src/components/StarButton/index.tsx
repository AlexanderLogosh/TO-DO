import React from 'react';
import {Box, IconButton} from "@material-ui/core";
import {Star, StarBorder} from "@material-ui/icons";

interface StarButtonProps {
  checked: boolean;
  onClick: ()=>void;
}

const StarButton = ({checked, ...rest}: StarButtonProps) => {

  return (
    <Box p={0.5} pl={0}>
      <IconButton size={'small'} {...rest}>
        {checked ? <Star/> : <StarBorder/> }
      </IconButton>
    </Box>
  );
};

export default StarButton;