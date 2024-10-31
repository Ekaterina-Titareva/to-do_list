import { ActionTypes } from '../types/actions';
import initialState, { State, Task } from '../types/state';
import { ADDED, CLEAR_ALL, DELETED, MARK_COMPLETED, RESTORE, RESTORE_COMPLETED, TODO_LIST_STATE } from '../utilities/constants';

const saveToLocalStorage = (state: State) => {
  localStorage.setItem(TODO_LIST_STATE, JSON.stringify(state));
};

const loadFromLocalStorage = () => {
  const savedState = localStorage.getItem(TODO_LIST_STATE);
  return savedState ? JSON.parse(savedState) : initialState;
};

const todosReducer = (state: State = loadFromLocalStorage(), action: ActionTypes): State => {
  let newState: State ;

  switch (action.type) {
    case ADDED:
      newState = {
        ...state,
        tasks: [...state.tasks, { id: state.nextId, text: action.payload, completed: false, deleted: false }],
        allTasks: [...state.allTasks, { id: state.nextId, text: action.payload, completed: false, deleted: false }],
        nextId: state.nextId + 1,
      };
      saveToLocalStorage(newState);
      return newState;

    case DELETED: {
      const taskId = state.allTasks.findIndex(task => task.id === action.payload);
      const updatedAllTasks = [...state.allTasks];

      updatedAllTasks[taskId] = {
        ...updatedAllTasks[taskId],
        deleted: true
      };

      newState = {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        trash: [...state.trash, updatedAllTasks[taskId]],
        allTasks: updatedAllTasks 
      };
      saveToLocalStorage(newState);
      return newState;
    }

    case MARK_COMPLETED: {
      const taskId = state.allTasks.findIndex(task => task.id === action.payload);
      const updatedAllTasks = [...state.allTasks];
      updatedAllTasks[taskId] = {
        ...updatedAllTasks[taskId],
        completed: true
      };
      newState = {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        completedTasks: [...state.completedTasks, updatedAllTasks[taskId]],
        allTasks: updatedAllTasks
      };
      saveToLocalStorage(newState);
      return newState;
    }

    case RESTORE: {
      const taskId = state.trash.findIndex(task => task.id === action.payload);
      const updatedTrash = [...state.trash];
      const restoredTask = updatedTrash[taskId];
      updatedTrash.splice(taskId, 1);
      const updatedAllTasks = state.allTasks.map(task =>
          task.id === restoredTask.id ? { ...restoredTask, deleted: false } : task
      );

      newState = {
          ...state,
          tasks: [...state.tasks, { ...restoredTask, deleted: false }],
          trash: updatedTrash,
          allTasks: updatedAllTasks
      };
      saveToLocalStorage(newState);
      return newState;
    }

    case RESTORE_COMPLETED: {
      const taskId = state.completedTasks.findIndex(task => task.id === action.payload);
      const updatedCompleted = [...state.completedTasks];
      const restoredTask = updatedCompleted[taskId];
      updatedCompleted.splice(taskId, 1);
      const updatedAllTasks = state.allTasks.map(task =>
          task.id === restoredTask.id ? { ...restoredTask, completed: false } : task
      );
      newState = {
          ...state,
          tasks: [...state.tasks, { ...restoredTask, completed: false }],
          completedTasks: updatedCompleted,
          allTasks: updatedAllTasks
      };
      saveToLocalStorage(newState);
      return newState;
    }

    case CLEAR_ALL:
      newState = { ...state, tasks: [], completedTasks: [], trash: [], allTasks: [], nextId: 1 };
      saveToLocalStorage(newState);
      return newState;

    default:
      return state;
  }
};

export default todosReducer;