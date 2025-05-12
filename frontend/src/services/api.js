import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api"; // ✅ Ensure correct backend API URL

const fetchDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error.response?.data || error.message);
    return null;
  }
};

// ✅ CRUD Functions for Projects
const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error.response?.data || error.message);
    return [];
  }
};
const createProject = async (data) => await axios.post(`${API_BASE_URL}/projects`, data);
const updateProject = async (id, data) => await axios.put(`${API_BASE_URL}/projects/${id}`, data);
const deleteProject = async (id) => await axios.delete(`${API_BASE_URL}/projects/${id}`);

// ✅ CRUD Functions for Resources
const fetchResources = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/resources`);
    return response.data;
  } catch (error) {
    console.error("Error fetching resources:", error.response?.data || error.message);
    return [];
  }
};
const createResource = async (data) => await axios.post(`${API_BASE_URL}/resources`, data);
const updateResource = async (id, data) => await axios.put(`${API_BASE_URL}/resources/${id}`, data);
const deleteResource = async (id) => await axios.delete(`${API_BASE_URL}/resources/${id}`);

// ✅ CRUD Functions for Tasks
const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.response?.data || error.message);
    return [];
  }
};
const createTask = async (data) => await axios.post(`${API_BASE_URL}/tasks`, data);
const updateTask = async (id, data) => await axios.put(`${API_BASE_URL}/tasks/${id}`, data);
const deleteTask = async (id) => await axios.delete(`${API_BASE_URL}/tasks/${id}`);

// ✅ CRUD Functions for Users
const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    return [];
  }
};
const createUser = async (data) => {
  try {
    console.log("📤 Sending Data:", data); // ✅ Log request data
    const response = await axios.post(`${API_BASE_URL}/users`, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("✅ User Created:", response.data); // ✅ Log success
    return response.data;
  } catch (error) {
    console.error("❌ Error Creating User:", error.response?.data || error.message);
    throw error;
  }
};

const updateUser = async (id, data) => await axios.put(`${API_BASE_URL}/users/${id}`, data);
const deleteUser = async (id) => await axios.delete(`${API_BASE_URL}/users/${id}`);

// ✅ CRUD Functions for Reports
const fetchReports = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports`);
    console.log("📊 Reports Data from API:", response.data); // ✅ Debugging log
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching reports:", error.response?.data || error.message);
    return [];
  }
};
const createReport = async (data) => await axios.post(`${API_BASE_URL}/reports`, data);
const updateReport = async (id, data) => await axios.put(`${API_BASE_URL}/reports/${id}`, data);
const deleteReport = async (id) => await axios.delete(`${API_BASE_URL}/reports/${id}`);

// ✅ CRUD Functions for Notifications
const fetchNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error.response?.data || error.message);
    return [];
  }
};
const createNotification = async (data) => await axios.post(`${API_BASE_URL}/notifications`, data);
const updateNotification = async (id, data) => await axios.put(`${API_BASE_URL}/notifications/${id}`, data);
const deleteNotification = async (id) => await axios.delete(`${API_BASE_URL}/notifications/${id}`);

export {
  fetchDashboardStats, fetchProjects, createProject, updateProject, deleteProject,
  fetchResources, createResource, updateResource, deleteResource,
  fetchTasks, createTask, updateTask, deleteTask,
  fetchUsers, createUser, updateUser, deleteUser,
  fetchReports, createReport, updateReport, deleteReport,
  fetchNotifications, createNotification, updateNotification, deleteNotification
};
