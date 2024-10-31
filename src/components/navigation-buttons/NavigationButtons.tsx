import React from "react";
import { Button } from "@mui/material";

import {
  ALL_TASKS,
  ALL_TASKS_LABEL,
  COMPLETED_TASKS,
  COMPLETED_TASKS_LABEL,
  DELETED_TASKS,
  DELETED_TASKS_LABEL,
  TASKS,
  TASKS_LABEL,
} from "../../utilities/constants";

import styles from "./navigationButtons.module.css";

const NavigationButtons = ({
  setView,
  tasks,
  allTasks,
  completedTasks,
  trash,
}) => {
  const views = [
    { label: TASKS_LABEL, count: tasks.length, value: TASKS },
    { label: ALL_TASKS_LABEL, count: allTasks.length, value: ALL_TASKS },
    {
      label: COMPLETED_TASKS_LABEL,
      count: completedTasks.length,
      value: COMPLETED_TASKS,
    },
    { label: DELETED_TASKS_LABEL, count: trash.length, value: DELETED_TASKS },
  ];

  return (
    <div className={styles.buttonGroup}>
      {views.map(({ label, count, value }) => (
        <Button key={value} onClick={() => setView(value)}>
          {label} {count > 0 ? `(${count})` : ""}
        </Button>
      ))}
    </div>
  );
};

export default NavigationButtons;
