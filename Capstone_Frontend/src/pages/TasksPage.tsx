import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import type { Task } from "../types/Task";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch {
        setError("Unable to load tasks.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>Tasks</h1>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h2>{task.title}</h2>
              <p>{task.status}</p>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default TasksPage;