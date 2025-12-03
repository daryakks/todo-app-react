import { Box, Typography, TextField, Checkbox, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { useState, useEffect } from "react";

export default function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  useEffect(() => {
    setValue(task.title);
  }, [task.title]);

  const save = () => {
    if (!value.trim()) return;
    onEdit(value.trim());
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mt: 1,
        p: 1,
        borderRadius: 1,
        "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" }
      }}
    >
      <Checkbox
        checked={task.status === "done"}
        onChange={onToggle}
      />

      {isEditing ? (
        <TextField
          variant="standard"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ flexGrow: 1 }}
          autoFocus
        />
      ) : (
        <Typography
          sx={{
            flexGrow: 1,
            textDecoration: task.status === "done" ? "line-through" : "none",
            opacity: task.status === "done" ? 0.6 : 1
          }}
        >
          {task.title}
        </Typography>
      )}

      {isEditing ? (
        <IconButton onClick={save}>
          <DoneIcon color="primary" />
        </IconButton>
      ) : (
        <IconButton onClick={() => setIsEditing(true)}>
          <EditIcon color="primary" />
        </IconButton>
      )}

      <IconButton onClick={onDelete}>
        <DeleteIcon color="warning" />
      </IconButton>
    </Box>
  );
}
