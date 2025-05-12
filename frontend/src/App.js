import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectAnalysis from "./pages/ProjectAnalysis"; // Import the Project Analysis page
import Resources from "./pages/Resources";
import ResourceAnalysis from "./pages/ResourceAnalysis"; // Import the Resource Analysis page
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer"; 
import "./styles/global.css";

const App = () => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="content w-100">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/project-analysis" element={<ProjectAnalysis />} /> {/* Added Project Analysis Route */}
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/resource-analysis" element={<ResourceAnalysis />} /> {/* Added Resource Analysis Route */}
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Footer />
            </div>
        </div>
    );
};

export default App;