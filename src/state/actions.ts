import {ITask} from "../interfaces";
import {types} from "./types";

export const actions = {
  fillTasks: (tasks: ITask[])=>{
    return {
      type: types.FILL_TASKS,
      payload: tasks
    }
  },
  startFetching: ()=>{
    return {
      type: types.START_FETCHING,
    }
  },
  stopFetching: ()=>{
    return {
      type: types.STOP_FETCHING,
    }
  },
  updateTask: (task: ITask) => {
    return {
      type: types.UPDATE_TASK,
      payload: task
    }
  },
  createTask: (task: ITask) => {
    return {
      type: types.CREATE_TASK,
      payload: task
    }
  },
  deleteTask: (task: ITask) => {
    return {
      type: types.DELETE_TASK,
      payload: task
    }
  },

};