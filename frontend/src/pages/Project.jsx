import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../services/api";
import socket from "../socket/socket";

function Project() {
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState([]);
    const { id } = useParams();

    const fetchTasks = async () => {
        try {
            const res = await API.get(`/tasks/${id}`);
            setTasks(res.data);
        } catch (err) {
            alert("Fetching Tasks Failed:", err.message);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        socket.on("taskCreated", (task) => {
            setTasks((prev) => [...prev, task]);
        });

        socket.on("taskDeleted", (taskId) => {
            setTasks((prev) => prev.filter((t) => t._id !== taskId));
        });

        return () => {
            socket.off("taskCreated");
        };
    }, []);

    const createTask = async (e) => {
        e.preventDefault();

        try {
            await API.post("/tasks", {title, project:id});
            setTitle("");
        } catch (err) {
            alert("Task creation failed:", err.message);
        }
    }

    const updateStatus = async (taskId, status) => {
        await API.put(`/tasks/${taskId}`, { status });
        fetchTasks();
    }

    const deleteTask = async (id) => {
        await API.delete(`/tasks/${id}`);
        fetchTasks();
    }

    const todo = tasks.filter((t) => t.status === "todo");
    const progress = tasks.filter((t) => t.status === "in-progress");
    const done = tasks.filter((t) => t.status === "done");

    return (
        <div style={{padding: "40px"}}>
            <h2>Task Board</h2>
            <form onSubmit={createTask}>
                <input type="text" value={title} placeholder="Task title" onChange={(e) => setTitle(e.target.value)} />
                <button type="submit">Add Task</button>
            </form>
            <br />
            <div style={{display: "flex", gap: "40px"}}>
                <div>
                    <h3>Todo</h3>
                    {
                        todo.map((task) => (
                            <div key={task._id}>
                                <p>{task.title}</p>
                                <button onClick={() => updateStatus(task._id, "in-progress")}>Start</button>
                                <button onClick={() => deleteTask(task._id)}>Delete</button>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <h3>In-Progress</h3>
                    {
                        progress.map((task) => (
                            <div key={task._id}>
                                <p>{task.title}</p>
                                <button onClick={() => updateStatus(task._id, "done")}>Complete</button>
                                <button onClick={() => deleteTask(task._id)}>Delete</button>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <h3>Done</h3>
                    {
                        done.map((task) => (
                            <div key={task._id}>
                                <p>{task.title}</p>
                                <button onClick={() => deleteTask(task._id)}>Delete</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            <h3>Project Tasks</h3>
            <ul>
                {
                    tasks.map((task) => (
                        <div key={task._id}>
                            <li key={task._id}>{task.title} - {task.status}</li>
                            <button onClick={() => deleteTask(task._id)}>Delete</button>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

export default Project;
