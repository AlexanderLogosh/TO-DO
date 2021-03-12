import React, {useEffect, useState} from 'react';
import {ITask} from "../../interfaces";
import {Box} from "@material-ui/core";
import TodoListItem from '../TodoListItem';
import FlipMove from "react-flip-move";
import {filterTasksByMessage} from "../../instruments/helpers";

interface TodoListProps {
  tasks: ITask[],
  updateTask: (task: ITask) => void,
  deleteTask: (task: ITask) => void,
  filter: string
}

const TaskList = ({tasks, updateTask, deleteTask, filter}: TodoListProps) => {
  const [foundTasks, setFoundTasks] = useState<ITask[]>([]);

  useEffect(() => {
    setFoundTasks(filterTasksByMessage(tasks, filter));
  },[filter, tasks]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      minHeight={300}
      mt={2}>
      <FlipMove>
        {foundTasks.map((task) => (
          <TodoListItem
            key={task.id}
            updateTask={updateTask}
            deleteTask={deleteTask}
            task={task}
          />
        ))}
      </FlipMove>
    </Box>
  );
};

export default TaskList;