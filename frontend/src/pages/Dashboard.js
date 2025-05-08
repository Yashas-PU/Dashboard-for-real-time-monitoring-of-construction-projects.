import React, { useEffect, useState } from "react";
import { fetchDashboardStats, fetchProjects, fetchResources, fetchTasks, fetchUsers, fetchReports, fetchNotifications } from "../services/api";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import * as XLSX from "xlsx";

const Dashboard = () => {
    const [stats, setStats] = useState({});
    const [projects, setProjects] = useState([]);
    const [resources, setResources] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        setStats(await fetchDashboardStats() || {});
        setProjects(await fetchProjects());
        setResources(await fetchResources());
        setTasks(await fetchTasks());
        setUsers(await fetchUsers());
        // setReports(await fetchReports());
        setNotifications(await fetchNotifications());
    };

    const chartData = [
        { name: "Projects", value: stats.totalProjects || projects.length },
        { name: "Resources", value: stats.totalResources || resources.length },
        { name: "Tasks", value: stats.totalTasks || tasks.length },
        { name: "Users", value: stats.totalUsers || users.length },
        // { name: "Reports", value: stats.totalReports || reports.length },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#D35400"];

    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(chartData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Dashboard Data");
        XLSX.writeFile(workbook, "DashboardData.xlsx");
    };

    return (
        <Container className="mt-4">
            <h1 className="mb-4 text-center">Dashboard</h1>
            
            <Row className="mb-4 justify-content-center">
                {[ 
                    { title: "Projects", count: projects.length, bg: "white", textColor: "black" },
                    { title: "Resources", count: resources.length, bg: "success", textColor: "white" },
                    { title: "Tasks", count: tasks.length, bg: "warning", textColor: "black" },
                    { title: "Users", count: users.length, bg: "info", textColor: "white" },
                    // { title: "Reports", count: reports.length, bg: "primary", textColor: "white" }
                ].map((item, index) => (
                    <Col key={index} md={2} className="d-flex">
                        <Card className={`shadow text-center p-3 w-100 h-100 bg-${item.bg} text-${item.textColor}`}>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text className="display-4">{item.count}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            
            <Row>
                <Col md={6}>
                    <Card className="shadow p-3">
                        <Card.Body>
                            <h3>Data Overview</h3>
                            <BarChart width={500} height={300} data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#007bff" />
                            </BarChart>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="shadow p-3">
                        <Card.Body>
                            <h3>Statistics Breakdown</h3>
                            <PieChart width={400} height={300}>
                                <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <Row className="mt-4 justify-content-center">
                <Col md={3} className="text-center">
                    <Button variant="success" onClick={handleDownload}>Download Excel</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;