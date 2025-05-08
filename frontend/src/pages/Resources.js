import React, { useEffect, useState } from "react";
import { fetchResources, createResource, updateResource, deleteResource } from "../services/api";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [show, setShow] = useState(false);
    const [reportShow, setReportShow] = useState(false);
    const [formData, setFormData] = useState({ type: "manpower", name: "", status: "active", assigned_project_id: "" });
    const [editId, setEditId] = useState(null);
    const [reportData, setReportData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadResources();
    }, []);

    const loadResources = async () => {
        const data = await fetchResources();
        setResources(data);
    };

    const handleShow = (resource = null) => {
        if (resource) {
            setEditId(resource.id);
            setFormData(resource);
        } else {
            setEditId(null);
            setFormData({ type: "manpower", name: "", status: "active", assigned_project_id: "" });
        }
        setShow(true);
    };

    const handleClose = () => setShow(false);
    const handleReportClose = () => setReportShow(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await updateResource(editId, formData);
        } else {
            await createResource(formData);
        }
        handleClose();
        loadResources();
    };

    const handleDelete = async (id) => {
        await deleteResource(id);
        loadResources();
    };

    const generateReport = () => {
        const totalResources = resources.length;
        const activeResources = resources.filter(res => res.status === "active").length;
        const inactiveResources = resources.filter(res => res.status === "inactive").length;
        const maintenanceResources = resources.filter(res => res.status === "maintenance").length;

        setReportData({ totalResources, activeResources, inactiveResources, maintenanceResources });
        setReportShow(true);
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(resources);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Resources");
        XLSX.writeFile(workbook, "Resources.xlsx");
    };

    return (
        <Container className="mt-4">
            <h1>Resources</h1>
            <Button variant="primary" onClick={() => handleShow()}>Add Resource</Button>
            {/* <Button variant="info" className="ms-2" onClick={generateReport}>Generate Report</Button> */}
            <Button variant="success" className="ms-2" onClick={() => navigate("/resource-analysis")}>Resource Analysis</Button>
            <Button variant="warning" className="ms-2" onClick={downloadExcel}>Download Excel</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Assigned Project</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {resources.map((resource) => (
                        <tr key={resource.id}>
                            <td>{resource.id}</td>
                            <td>{resource.type}</td>
                            <td>{resource.name}</td>
                            <td>{resource.status}</td>
                            <td>{resource.assigned_project_id}</td>
                            <td>{new Date(resource.createdAt).toLocaleString()}</td>
                            <td>{new Date(resource.updatedAt).toLocaleString()}</td>
                            <td>
                                <Button variant="warning" className="me-2" onClick={() => handleShow(resource)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(resource.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Adding/Editing Resource */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editId ? "Edit Resource" : "Add Resource"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                                <option value="manpower">Manpower</option>
                                <option value="equipment">Equipment</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="maintenance">Maintenance</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Assigned Project ID</Form.Label>
                            <Form.Control type="number" value={formData.assigned_project_id} onChange={(e) => setFormData({ ...formData, assigned_project_id: e.target.value })} />
                        </Form.Group>
                        <Button variant="primary" type="submit">{editId ? "Update" : "Create"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Resources;
