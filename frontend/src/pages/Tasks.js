// src/pages/Tasks.js
import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/api";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "", status: "pending", assigned_to: "", project_id: "", due_date: "" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const data = await fetchTasks();
        setTasks(data);
    };

    const handleShow = (task = null) => {
        if (task) {
            setEditId(task.id);
            setFormData(task);
        } else {
            setEditId(null);
            setFormData({ name: "", description: "", status: "pending", assigned_to: "", project_id: "", due_date: "" });
        }
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await updateTask(editId, formData);
        } else {
            await createTask(formData);
        }
        handleClose();
        loadTasks();
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    return (
        <Container className="mt-4">
            <h1>Tasks</h1>
            <Button variant="primary" onClick={() => handleShow()}>Add Task</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Project ID</th>
                        <th>Due Date</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.name}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{task.assigned_to}</td>
                            <td>{task.project_id}</td>
                            <td>{new Date(task.due_date).toLocaleDateString()}</td>
                            <td>{new Date(task.createdAt).toLocaleString()}</td>
                            <td>{new Date(task.updatedAt).toLocaleString()}</td>
                            <td>
                                <Button variant="warning" className="me-2" onClick={() => handleShow(task)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(task.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Adding/Editing Task */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editId ? "Edit Task" : "Add Task"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                <option value="pending">Pending</option>
                                <option value="in progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Assigned To (User ID)</Form.Label>
                            <Form.Control type="number" value={formData.assigned_to} onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Project ID</Form.Label>
                            <Form.Control type="number" value={formData.project_id} onChange={(e) => setFormData({ ...formData, project_id: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date" value={formData.due_date} onChange={(e) => setFormData({ ...formData, due_date: e.target.value })} />
                        </Form.Group>
                        <Button variant="primary" type="submit">{editId ? "Update" : "Create"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Tasks;