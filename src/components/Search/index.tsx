import React from 'react';
import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';

interface SearchProps {
  handleSearch: (value: string) => void
}

const Search = ({handleSearch}: SearchProps) => {
  return (
    <TextField
      variant={"outlined"}
      size={"small"}
      type={'search'}
      onChange={event => handleSearch(event.target.value)}
      InputProps={{
        startAdornment: <InputAdornment position="start">
            <SearchIcon color={"action"}/>
        </InputAdornment>,
      }}
      placeholder={'Search'}/>
  );
};

export default Search;