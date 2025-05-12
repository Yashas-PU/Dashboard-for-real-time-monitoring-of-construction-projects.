import React, { useEffect, useState } from "react";
import { fetchNotifications, createNotification, updateNotification, deleteNotification } from "../services/api";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({ message: "", type: "info", project_id: "" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        const data = await fetchNotifications();
        setNotifications(data);
    };

    const handleShow = (notification = null) => {
        if (notification) {
            setEditId(notification.id);
            setFormData(notification);
        } else {
            setEditId(null);
            setFormData({ message: "", type: "info", project_id: "" });
        }
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await updateNotification(editId, formData);
        } else {
            await createNotification(formData);
        }
        handleClose();
        loadNotifications();
    };

    const handleDelete = async (id) => {
        await deleteNotification(id);
        loadNotifications();
    };

    return (
        <Container className="mt-4">
            <h1>Notifications</h1>
            <Button variant="primary" onClick={() => handleShow()}>Add Notification</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Message</th>
                        <th>Type</th>
                        <th>Project ID</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map((notification) => (
                        <tr key={notification.id}>
                            <td>{notification.id}</td>
                            <td>{notification.message}</td>
                            <td>{notification.type}</td>
                            <td>{notification.project_id || "N/A"}</td>
                            <td>{new Date(notification.created_at).toLocaleString()}</td>
                            <td>
                                <Button variant="warning" className="me-2" onClick={() => handleShow(notification)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(notification.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Adding/Editing Notification */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editId ? "Edit Notification" : "Add Notification"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="info">Info</option>
                                <option value="warning">Warning</option>
                                <option value="alert">Alert</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Project ID (Optional)</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.project_id}
                                onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">{editId ? "Update" : "Create"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Notifications;
