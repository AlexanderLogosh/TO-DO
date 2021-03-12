import {types} from "./types";
import React from "react";
import {Action, RootState} from "../interfaces";

export const ContextApp = React.createContext<any>(null);

export const initialState: RootState = {
  tasks: [],
  isFetching: false
};

export const reducer = (state: RootState = initialState, action: Action) => {
  switch (action.type) {
    case types.START_FETCHING:
      return {
        ...state,
        isFetching: true
      };
    case types.STOP_FETCHING:
      return {
        ...state,
        isFetching: false
      };
    case types.FILL_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case types.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => (
          task.id === action.payload.id ? action.payload : task
        ))
      };
    case types.CREATE_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.payload
        ]
      };
    case types.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => (
          task.id !== action.payload.id
        ))
      };
    default:
      return state;
  }
};

