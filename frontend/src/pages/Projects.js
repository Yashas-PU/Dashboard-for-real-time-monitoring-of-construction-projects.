// src/pages/Projects.js
import React, { useEffect, useState } from "react";
import { fetchProjects, createProject, updateProject, deleteProject } from "../services/api";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "", start_date: "", end_date: "", budget: "", status: "pending" });
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        const data = await fetchProjects();
        setProjects(data);
    };

    const handleShow = (project = null) => {
        if (project) {
            setEditId(project.id);
            setFormData({
                name: project.name,
                description: project.description,
                start_date: project.start_date.split("T")[0],
                end_date: project.end_date ? project.end_date.split("T")[0] : "",
                budget: project.budget,
                status: project.status,
            });
        } else {
            setEditId(null);
            setFormData({ name: "", description: "", start_date: "", end_date: "", budget: "", status: "pending" });
        }
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await updateProject(editId, formData);
        } else {
            await createProject(formData);
        }
        handleClose();
        loadProjects();
    };

    const handleDelete = async (id) => {
        await deleteProject(id);
        loadProjects();
    };

    return (
        <Container className="mt-4">
            <h1>Projects</h1>
            <div className="d-flex gap-2 mb-3">
                <Button variant="primary" onClick={() => handleShow()}>Add Project</Button>
                <Button variant="info" onClick={() => navigate("/project-analysis")} >View Analysis</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Budget</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.name}</td>
                            <td>{project.description}</td>
                            <td>{project.start_date.split("T")[0]}</td>
                            <td>{project.end_date ? project.end_date.split("T")[0] : "N/A"}</td>
                            <td>₹{project.budget}</td>
                            <td>{project.status}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShow(project)}>Edit</Button>
                                <Button variant="danger" className="ms-2" onClick={() => handleDelete(project.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Adding/Editing Project */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editId ? "Edit Project" : "Add Project"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Budget</Form.Label>
                            <Form.Control type="number" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                <option value="pending">Pending</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">{editId ? "Update" : "Create"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Projects;
