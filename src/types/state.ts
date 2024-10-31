import store  from '../store/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface Task {
    id: number
    text: string;
    completed: boolean;
    deleted: boolean;
  }
  
  export interface State {
    tasks: Task[];
    completedTasks: Task[];
    trash: Task[];
    allTasks: Task[];
    nextId: number;
  }
  
  const initialState: State = {
    tasks: [],
    completedTasks: [],
    trash: [],
    allTasks: [],
    nextId: 1,
  };
  
  export default initialState;