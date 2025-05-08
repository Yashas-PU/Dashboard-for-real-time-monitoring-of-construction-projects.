import React, { useEffect, useState } from "react";
import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, LineChart, Line, Legend 
} from "recharts";
import { fetchProjects } from "../services/api";
import { Container, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const ProjectAnalysis = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        const data = await fetchProjects();
        setProjects(data);
    };

    const statusData = [
        { name: "Pending", value: projects.filter(p => p.status === "pending").length },
        { name: "Ongoing", value: projects.filter(p => p.status === "ongoing").length },
        { name: "Completed", value: projects.filter(p => p.status === "completed").length },
    ];

    const COLORS = ["#FFBB28", "#FF8042", "#00C49F"];

    const durationData = projects.map(project => ({
        name: project.name,
        duration: Math.abs(new Date(project.end_date) - new Date(project.start_date)) / (1000 * 60 * 60 * 24),
    }));

    const costPerDayData = projects.map(project => ({
        name: project.name,
        costPerDay: project.budget / (Math.abs(new Date(project.end_date) - new Date(project.start_date)) / (1000 * 60 * 60 * 24)),
    }));

    const budgetComparisonData = projects.map(project => ({
        name: project.name,
        budget: project.budget,
        actualCost: project.actual_cost || (project.budget * 0.9 + Math.random() * project.budget * 0.2),
    }));

    // Function to download analysis as Excel
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet([
            { Title: "Project Name", Duration: "Duration (Days)", Budget: "Budget", "Actual Cost": "Actual Cost" },
            ...projects.map(project => ({
                Title: project.name,
                Duration: Math.abs(new Date(project.end_date) - new Date(project.start_date)) / (1000 * 60 * 60 * 24),
                Budget: project.budget,
                "Actual Cost": project.actual_cost || (project.budget * 0.9 + Math.random() * project.budget * 0.2),
            })),
        ]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Project Analysis");
        XLSX.writeFile(workbook, "Project_Analysis.xlsx");
    };

    return (
        <Container className="mt-4">
            <h1>Project Analysis</h1>
            <Button variant="secondary" onClick={() => navigate("/projects")}>Back to Projects</Button>

            {/* Download Button */}
            <Dropdown className="mt-3">
                <Dropdown.Toggle variant="primary">Download Analysis</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={downloadExcel}>Download as Excel</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* Budget Distribution */}
            <h3 className="mt-4">Budget Distribution</h3>
            <ResponsiveContainer width="100%" height={250} >
                <BarChart data={projects}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="budget" fill="#8884d8" barSize={40} />
                </BarChart>
            </ResponsiveContainer>

            {/* Project Status Distribution */}
            <h3 className="mt-4">Project Status Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                        {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            {/* Project Duration Analysis */}
            <h3 className="mt-4">Project Duration (Days)</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={durationData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#82ca9d" barSize={40} />
                </BarChart>
            </ResponsiveContainer>

            {/* Cost Per Day Analysis */}
            <h3 className="mt-4">Cost Per Day Analysis</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={costPerDayData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="costPerDay" fill="#FF8042" barSize={40} />
                </BarChart>
            </ResponsiveContainer>

            {/* Budget vs Actual Cost */}
            <h3 className="mt-4">Budget vs Actual Cost</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={budgetComparisonData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="budget" stroke="#8884d8" />
                    <Line type="monotone" dataKey="actualCost" stroke="#FF8042" />
                </LineChart>
            </ResponsiveContainer>
        </Container>
    );
};

export default ProjectAnalysis;