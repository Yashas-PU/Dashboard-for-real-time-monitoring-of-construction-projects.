import React, { useEffect, useState } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "../services/api";
import { Container, Table, Button, Form, Modal, Alert } from "react-bootstrap";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const data = await fetchUsers();
        setUsers(data);
    };

    const handleShow = (user = null) => {
        setError(""); // Clear errors on opening modal
        if (user) {
            setEditId(user.id);
            setFormData({ name: user.name, email: user.email, password: "", role: user.role });
        } else {
            setEditId(null);
            setFormData({ name: "", email: "", password: "", role: "user" });
        }
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setEditId(null);
    };

    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log("📤 Submitting Data:", formData); // ✅ Log data before request

    if (editId) {
      await updateUser(editId, formData);
    } else {
      if (!formData.password) {
        setError("Password is required for new users.");
        return;
      }
      await createUser(formData);
    }

    alert("✅ User saved successfully!");
    handleClose();
    loadUsers();
  } catch (error) {
    console.error("❌ Create User Error:", error.response?.data || error.message);
    setError(error.response?.data?.error || "Failed to save user. Check your inputs.");
  }
};


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id);
            loadUsers();
        }
    };

    return (
        <Container className="mt-4">
            <h1>Users Management</h1>
            <Button variant="primary" onClick={() => handleShow()}>Add User</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}</td>
                            <td>{user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A"}</td>
                            <td>
                                <Button variant="warning" className="me-2" onClick={() => handleShow(user)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Adding/Editing User */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editId ? "Edit User" : "Add User"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                        </Form.Group>
                        {!editId && (
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required={!editId} />
                            </Form.Group>
                        )}
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">{editId ? "Update" : "Create"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Users;
