import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";

import {
  addTask,
  clearAll,
  deleteTask,
  markCompleted,
  restoreCompletedTask,
  restoredTask,
} from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store/store";

import ToDoListItem from "../../components/to-do_list_item/ToDoListItem";
import NavigationButtons from "../../components/navigation-buttons/NavigationButtons";
import {
  ADDED_TITLE,
  ALL_TASKS,
  CLEAR_ALL_TITLE,
  COMPLETED_TASKS,
  DELETED_TASKS,
  DELETED_TITLE,
  INPUT_LABEL,
  MARK_COMPLETED_TITLE,
  TASKS,
} from "../../utilities/constants";

import styles from "./ToDoList.module.css";

const ToDoList: React.FC = () => {
  const [task, setTask] = useState("");
  const [view, setView] = useState(ALL_TASKS);
  const dispatch = useAppDispatch();

  const allTasks = useAppSelector((state) => state.allTasks);
  const tasks = useAppSelector((state) => state.tasks);
  const trash = useAppSelector((state) => state.trash);
  const completedTasks = useAppSelector((state) => state.completedTasks);

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task));
      setTask("");
    }
  };

  const renderTasks = () => {
    switch (view) {
      case TASKS:
        return (
          <List sx={{ width: "100%", bgcolor: "transparent" }}>
            {tasks.map((task) => (
              <ToDoListItem
                key={task.id}
                task={task}
                onMarkCompleted={() => dispatch(markCompleted(task.id))}
                onDelete={() => dispatch(deleteTask(task.id))}
              />
            ))}
          </List>
        );
      case ALL_TASKS:
        return (
          <List sx={{ width: "100%", bgcolor: "transparent" }}>
            {allTasks.map((task) => (
              <ListItem key={task.id} divider>
                <ListItemText primary={task.text} />
                {!task.deleted && (
                  <IconButton
                    title={MARK_COMPLETED_TITLE}
                    aria-label={MARK_COMPLETED_TITLE}
                    disabled={task.completed}
                    onClick={() => dispatch(markCompleted(task.id))}
                  >
                    <DoneIcon />
                  </IconButton>
                )}
                {!task.completed && (
                  <IconButton
                    title={DELETED_TITLE}
                    aria-label={DELETED_TITLE}
                    disabled={task.deleted}
                    onClick={() => dispatch(deleteTask(task.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
        );
      case COMPLETED_TASKS:
        return (
          <List sx={{ width: "100%", bgcolor: "transparent" }}>
            {completedTasks.map((task) => (
              <ToDoListItem
                key={task.id}
                task={task}
                onRestore={() => dispatch(restoreCompletedTask(task.id))}
              />
            ))}
          </List>
        );
      case DELETED_TASKS:
        return (
          <List sx={{ width: "100%", bgcolor: "transparent" }}>
            {trash.map((task) => (
              <ToDoListItem
                key={task.id}
                task={task}
                onRestore={() => dispatch(restoredTask(task.id))}
              />
            ))}
          </List>
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <div className={`${styles.wrapper} ${styles.container}`}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddTask}
        >
          {ADDED_TITLE}
        </Button>
        <TextField
          id="filled-basic"
          label={INPUT_LABEL}
          autoFocus
          variant="standard"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          variant="contained"
          endIcon={<ClearAllIcon />}
          onClick={() => dispatch(clearAll())}
          color="error"
        >
          {CLEAR_ALL_TITLE}
        </Button>
      </div>
      <div className={styles.wrapper}>
        <NavigationButtons
          setView={setView}
          tasks={tasks}
          allTasks={allTasks}
          completedTasks={completedTasks}
          trash={trash}
        />

        {renderTasks()}
      </div>
    </main>
  );
};

export default ToDoList;
