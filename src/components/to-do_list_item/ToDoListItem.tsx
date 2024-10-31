import React from "react";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import RestoreIcon from "@mui/icons-material/Restore";

import { Task } from "../../types/state";
import {
  DELETED_TITLE,
  MARK_COMPLETED_TITLE,
  RESTORE_TITLE,
} from "../../utilities/constants";

type Props = {
  task: Task;
  onMarkCompleted?: () => void;
  onDelete?: () => void;
  onRestore?: () => void;
};

const ToDoListItem: React.FC<Props> = ({
  task,
  onMarkCompleted,
  onDelete,
  onRestore,
}) => (
  <ListItem key={task.id} divider>
    <ListItemText primary={task.text} />
    {onMarkCompleted && (
      <IconButton title={MARK_COMPLETED_TITLE} onClick={onMarkCompleted}>
        <DoneIcon />
      </IconButton>
    )}
    {onDelete && (
      <IconButton title={DELETED_TITLE} onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    )}
    {onRestore && (
      <IconButton title={RESTORE_TITLE} onClick={onRestore}>
        <RestoreIcon />
      </IconButton>
    )}
  </ListItem>
);

export default ToDoListItem;
