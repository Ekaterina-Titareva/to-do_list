import { AddAction, ClearAllAction, DeleteAction, MarkCompletedAction, RestoreAction, RestoreCompletedTaskAction} from "../types/actions";
import { ADDED, CLEAR_ALL, DELETED, MARK_COMPLETED, RESTORE, RESTORE_COMPLETED } from "../utilities/constants";

export const addTask = (task: string): AddAction => ({ type: ADDED, payload: task });
export const deleteTask = (id: number): DeleteAction => ({ type: DELETED, payload: id });
export const markCompleted = (id: number): MarkCompletedAction => ({
  type: MARK_COMPLETED,
  payload: id,
});
export const restoredTask = (id: number): RestoreAction => ({
  type: RESTORE,
  payload: id,
});
export const restoreCompletedTask = (id: number): RestoreCompletedTaskAction => ({
  type: RESTORE_COMPLETED,
  payload: id,
});
export const clearAll = (): ClearAllAction => ({
  type: CLEAR_ALL,
});