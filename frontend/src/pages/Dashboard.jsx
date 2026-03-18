import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function Dashboard() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const fetchProjects = async () => {
        try {
            const res = await API.get("/projects");
            setProjects(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    const createProject = async (e) => {
        e.preventDefault();

        try {
            await API.post("/projects", {title, description});
            setTitle("");
            setDescription("");
            fetchProjects();
        }  catch (err) {
            alert("Project creation failed");
        }
    }

    return (
        <div style={{padding: "40px"}}>
            <h1>Dashboard</h1>
            <h3>Create Project</h3>
            <form onSubmit={createProject}>
                <div>
                    <input type="text" value={title} placeholder="Project Title" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <br />
                <div>
                    <input type="text" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <br />
                <button type="submit">Create Project</button>
            </form>
            <hr />
            <h3>Your Projects</h3>
            <ul>
                {
                    projects.map((project) => (
                        <li key={project._id}>
                            <Link to={`/project/${project._id}`}>
                                {project.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;
