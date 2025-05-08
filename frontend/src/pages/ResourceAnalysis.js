import React, { useEffect, useState } from "react";
import { fetchResources } from "../services/api";
import { Container, Button, Table } from "react-bootstrap";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";
import { useNavigate } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const ResourcesAnalysis = () => {
    const [resources, setResources] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadResources();
    }, []);

    const loadResources = async () => {
        const data = await fetchResources();
        setResources(data);
    };

    const resourceStatusData = [
        { name: "Active", value: resources.filter(res => res.status === "active").length },
        { name: "Inactive", value: resources.filter(res => res.status === "inactive").length },
        { name: "Maintenance", value: resources.filter(res => res.status === "maintenance").length }
    ];

    const resourceTypeData = [
        { name: "Manpower", value: resources.filter(res => res.type === "manpower").length },
        { name: "Equipment", value: resources.filter(res => res.type === "equipment").length }
    ];

    return (
        <Container className="mt-4">
            <h1>Resources Analysis</h1>
            <Button variant="secondary" onClick={() => navigate("/resources")}>Back to Resources</Button>
            
            <h3 className="mt-4">Resource Status Overview</h3>
            <PieChart width={400} height={300}>
                <Pie data={resourceStatusData} cx={200} cy={150} outerRadius={100} fill="#8884d8" dataKey="value">
                    {resourceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>

            <h3 className="mt-4">Resource Type Distribution</h3>
            <BarChart width={500} height={300} data={resourceTypeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>

            <h3 className="mt-4">Resource Creation Trends</h3>
            <LineChart width={500} height={300} data={resources.map(res => ({ name: new Date(res.createdAt).toLocaleDateString(), value: 1 }))}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>

            <h3 className="mt-4">Detailed Resource Table</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Assigned Project</th>
                    </tr>
                </thead>
                <tbody>
                    {resources.map(resource => (
                        <tr key={resource.id}>
                            <td>{resource.id}</td>
                            <td>{resource.type}</td>
                            <td>{resource.name}</td>
                            <td>{resource.status}</td>
                            <td>{resource.assigned_project_id}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ResourcesAnalysis;
