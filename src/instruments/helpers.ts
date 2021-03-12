import {ITask} from "../interfaces";
import moment from 'moment';

export const sortTasksByDate = (tasks:ITask[]) => {
  return tasks.sort((task1, task2) => {
    if (moment(task1.created).unix() < moment(task2.created).unix()) {
      return 1;
    } else if (
      moment(task1.created).unix() > moment(task2.created).unix()
    ) {
      return -1;
    }

    return 0;
  });
};

export const sortTasksByGroup = (tasks: ITask[]) => {
  console.log(tasks);
  const favorite = tasks.filter((task) => task.starred && !task.completed);
  const usual = tasks.filter((task) => !task.starred && !task.completed);
  const completed = sortTasksByDate(tasks.filter((task) => task.completed));

  const sortedCompleted = [
    ...completed.sort((task1, task2) => {
      if (task1.starred && !task2.starred) {
        return -1;
      } else if (!task1.starred && task2.starred) {
        return 1;
      }

      return 0;
    })
  ];

  return [
    ...sortTasksByDate(favorite),
    ...sortTasksByDate(usual),
    ...sortedCompleted
  ];
};

export const filterTasksByMessage = (tasks: ITask[], filter: string) => {
  if (filter !== '') {
    return tasks.filter((task) => task.text.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

  return tasks;
};