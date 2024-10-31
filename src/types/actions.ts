import { ADDED, CLEAR_ALL, DELETED, MARK_COMPLETED, RESTORE, RESTORE_COMPLETED } from "../utilities/constants";

export interface AddAction {
    type: typeof ADDED;
    payload: string;
  }
  
  
export interface DeleteAction {
    type: typeof DELETED;
    payload: number;
  }

  export interface MarkCompletedAction {
    type: typeof MARK_COMPLETED;
    payload: number;
  }
  
  export interface RestoreAction {
    type: typeof RESTORE;
    payload: number;
  }

  export interface RestoreCompletedTaskAction {
    type: typeof RESTORE_COMPLETED;
    payload: number;
  }

  export interface ClearAllAction {
    type: typeof CLEAR_ALL;
  }
  
  export type ActionTypes = AddAction | DeleteAction | MarkCompletedAction | RestoreAction | RestoreCompletedTaskAction | ClearAllAction;