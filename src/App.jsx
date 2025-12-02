import { useState } from "react";
import { Container } from "@mui/material";
import TodoList from "./components/TodoList";

export default function App() {
  const [tasks, setTasks] = useState([]);

  // ➕ Создание задачи → в конец "plan"
  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      desc: "",
      priority: "low",
      date: "",
      status: "plan"
    };

    setTasks(prev => [...prev, newTask]);
  };

  // ✏️ Редактирование названия (inline)
  const updateTaskTitle = (id, newTitle) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, title: newTitle } : t)
    );
  };

  // 🔄 Переключение "plan" <-> "done"
  // готовая → в начало "done"
  // плановая → в конец "plan"
  const toggleTask = (id) => {
    setTasks(prev => {
      return prev.map(t =>
        t.id === id
          ? {
              ...t,
              status: t.status === "plan" ? "done" : "plan"
            }
          : t
      ).sort((a, b) => {
        // сортировка: done ↑ сверху, plan ↓ снизу
        if (a.status === "done" && b.status === "plan") return -1;
        if (a.status === "plan" && b.status === "done") return 1;
        return 0;
      });
    });
  };

  // 🗑 Удаление
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <Container sx={{ py: 5 }}>
      <TodoList
        tasks={tasks}
        addTask={addTask}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        updateTaskTitle={updateTaskTitle}
      />
    </Container>
  );
}
