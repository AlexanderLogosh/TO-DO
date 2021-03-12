import React, {useState} from 'react';
import {ITask} from "../../interfaces";
import {
  OutlinedInput, InputLabel, InputAdornment, FormControl, IconButton
} from '@material-ui/core';

import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

interface TaskInputProps {
  onSubmit: (task: ITask) => void
}

const TaskInput = ( {onSubmit}: TaskInputProps ) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue !== "") {
      createTask();
    }
    if (event.key === "Escape" || event.key === "Esc") {
      setInputValue("");
    }
  };

  const createTask = () => {
    if (inputValue.replace(/\s/g,"") !== "") {
      onSubmit({
        text: inputValue,
        completed: false,
        starred: false,
        created:(new Date()).getDate()
      });
      setInputValue("");
    }
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">
        {'Add todo'}
      </InputLabel>
      <OutlinedInput
        value={inputValue}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        labelWidth={70}
        startAdornment={<InputAdornment position="start">
          <IconButton
            size={'small'}
            onClick={createTask}>
            <AddToPhotosIcon color={'action'}/>
          </IconButton>
        </InputAdornment>}
      />
    </FormControl>
  );
};

export default TaskInput;