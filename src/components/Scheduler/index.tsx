import React, {useContext, useEffect, useState} from 'react';
import {Box, Paper, Typography} from "@material-ui/core";
import TaskInput from "../TaskInput";
import TaskList from "../TodoList";
import {ContextApp} from "../../state/reducer";
import {api} from "../../instruments/api";
import {actions} from "../../state/actions";
import Search from "../Search";
import CheckboxButton from "../CheckboxButton";
import Spinner from "../Spinner";
import {ITask} from "../../interfaces";
import {sortTasksByGroup} from "../../instruments/helpers";

const Scheduler = () => {
  const {state, dispatch} = useContext(ContextApp);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorted, setSorted] = useState<ITask[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  const completeAll = () => {
    dispatch(actions.startFetching());
    const needComplete = state.tasks.filter(
      (task: ITask) => !task.completed
    );

    api.completeAll( needComplete ).then(() => {
      dispatch(actions.fillTasks(
        state.tasks.map((task: ITask) => {
          return { ...task, completed: true };
        })
      ));
      dispatch(actions.stopFetching());
    });
  };

  const handleUpdateTask = ( task: ITask ) => {
    dispatch(actions.startFetching());
    api.update(task).then(() => {
      dispatch(actions.updateTask(task));
      dispatch(actions.stopFetching());
    });
  };

  const handleCreateTask = ( task: ITask ) => {
    dispatch(actions.startFetching());
    api.create(task).then((response) => {
      dispatch(actions.createTask(response));
      dispatch(actions.stopFetching());
    });
  };

  const handleDeleteTask = ( task: ITask ) => {
    dispatch(actions.startFetching());
    api.delete(task).then(() => {
      dispatch(actions.deleteTask(task));
      dispatch(actions.stopFetching());
    });
  };


  useEffect(()=>{
    dispatch(actions.startFetching());
    api.get().then((response)=>{
      dispatch(actions.fillTasks(response.results));
      dispatch(actions.stopFetching());
    })
  },[dispatch]);

  useEffect(() => {
    setSorted( sortTasksByGroup(state.tasks) );

    const checkAll = state.tasks.every((task:ITask)=>{
      return task.completed
    });
    setAllChecked(checkAll);
  },[state.tasks]);

  return (
    <Box p={4} mt={8}>
      <Paper>
        <Box p={2}>
          <Box
            pb={2}
            display={'flex'}
            justifyContent={'space-between'}>
            <Typography variant={"h4"}>
              {'Scheduler'}
            </Typography>
            <Box display={'flex'} alignItems={'center'}>
              {state.isFetching && <Spinner />}
              <Search handleSearch={setSearchQuery}/>
            </Box>
          </Box>
          <TaskInput onSubmit={handleCreateTask}/>
          <TaskList
            tasks={sorted}
            updateTask={handleUpdateTask}
            deleteTask={handleDeleteTask}
            filter={searchQuery}
            />
        </Box>
        <Box
          p={2}
          display={'flex'}
          alignItems={'center'}>
          <CheckboxButton
            onClick={completeAll}
            checked={allChecked}
            disabled={allChecked}/>
          <Box ml={1}>
            <Typography>{'Complete all'}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Scheduler;