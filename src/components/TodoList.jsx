import { Box, Typography, TextField, IconButton, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TodoItem from "./TodoItem";
import { useState } from "react";

export default function TodoList({
  tasks,
  addTask,
  toggleTask,
  deleteTask,
  updateTaskTitle
}) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    addTask(input.trim());
    setInput("");
  };

  const plan = tasks.filter(t => t.status === "plan");
  const done = tasks.filter(t => t.status === "done");

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 4,
        background: "white",
        boxShadow: "0 0 30px rgba(0,0,0,0.08)",
        minHeight: "60vh"
      }}
    >
      <Typography variant="h4" sx={{ color: "#2196F3", fontWeight: 400 }}>
        TODO
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <TextField
          fullWidth
          variant="standard"
          label="Имя новой задачи"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IconButton onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* PLAN */}
      {plan.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography sx={{ opacity: 0.7 }}>
            ПЛАН ({plan.length})
          </Typography>

          {plan.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
              onEdit={(newTitle) => updateTaskTitle(task.id, newTitle)}
            />
          ))}
        </>
      )}

      {/* DONE */}
      {done.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography sx={{ opacity: 0.7 }}>
            ГОТОВО ({done.length})
          </Typography>

          {done.map(task => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
              onEdit={(newTitle) => updateTaskTitle(task.id, newTitle)}
            />
          ))}
        </>
      )}
    </Box>
  );
}
