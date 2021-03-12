import React, {
  useState, MutableRefObject, forwardRef, useRef, useEffect
} from "react";
import CheckboxButton from "../CheckboxButton";
import StarButton from "../StarButton";
import EditButton from "../EditButton";
import DeleteButton from "../DeleteButton";
import {ITask} from "../../interfaces";
import clsx from "clsx";
import { Styles } from "./styles";
import {Box, InputBase, Divider, ClickAwayListener} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(Styles);

interface TodoListItemProps {
  task: ITask,
  updateTask: (task: ITask) => void,
  deleteTask: (task: ITask) => void
}

const TodoListItem = forwardRef((
  {task, updateTask, deleteTask}: TodoListItemProps,
  ref: ((instance: any) => void) | MutableRefObject<any> | null
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(task.text);
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isStarred, setIsStarred] = useState(task.starred);
  const [isEdit, setIsEdit] = useState(false);

  const classes = useStyles();
  const inputStyles = clsx({
    [classes.input] : true,
    [classes.inputInFocus] : isEdit,
    [classes.completed] : isCompleted
  })

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && text !== "" && text !== task.text) {
      updateTask({...task, text: text})
      setIsEdit(false);
    }
    if (event.key === "Escape" || event.key === "Esc") {
      setText(task.text);
      setIsEdit(false);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    isEdit && event.target.select();
  };

  const handleClickAway = () => {
    console.log("click away");
    setText(task.text);
    setIsEdit(false);
  };


  const onCheckButton = () => {
    updateTask({...task, completed: !isCompleted});
    setIsCompleted(!isCompleted);
  };

  const onStarButton = () => {
    updateTask({...task, starred: !isStarred});
    setIsStarred(!isStarred);
  };

  const onEditButton = () => {
    text !== task.text && updateTask({...task, text: text})
    setIsEdit(!isEdit);
  };

  const onDeleteButton = () => {
    deleteTask(task);
  };

  useEffect(() => {
    setText(task.text);
    setIsCompleted(task.completed);
    setIsStarred(task.starred);
  }, [task]);


  useEffect(() => {
    if(isEdit){
      inputRef?.current?.focus();
    }
  }, [isEdit]);

  return (
    <div ref={ref}>
      <Box
        py={1}
        display={'flex'}
        flexDirection={'row'}
        borderBottom={"1px solid"}>
        <CheckboxButton
          checked={task.completed}
          onClick={onCheckButton}
        />
        <StarButton
          checked={task.starred}
          onClick={onStarButton}
        />
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={classes.clickAwayListener}>
            <EditButton
              onClick={onEditButton}
              id={'editButton'}/>
            <InputBase
              fullWidth
              value={text}
              disabled={!isEdit}
              onFocus={onFocus}
              onChange={onChange}
              onKeyDown={onKeyDown}
              className={inputStyles}
              inputProps={{
                ref: inputRef
              }}
            />
          </div>
        </ClickAwayListener>
        <DeleteButton onClick={onDeleteButton}/>
      </Box>
      <Divider/>
    </div>
  );
});

export default TodoListItem;