import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  deleteUser,
  getPieData,
  getLineData,
} from "../api/api";

import {
  PieChart,
  Pie,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area
} from "recharts";

const Admin = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    danger: "#dc3545",
    success: "#198754"
  };

  const COLORS = ["#1e3a8a", "#c5a059", "#3b82f6", "#10b981"];

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    } else {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleView = async (user) => {
    setSelectedUser(user);
    try {
      const pieRes = await getPieData(user._id);
      const lineRes = await getLineData(user._id);
      setPieData(pieRes.data || []);
      setLineData(lineRes.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid py-5 px-lg-5" style={{ backgroundColor: "#f4f7fe", minHeight: "100vh" }}>
      
      {/* Header Area */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: theme.navy }}>Management Console</h2>
          <p className="text-muted mb-0">Monitor user activity and academic performance metrics.</p>
        </div>
        <div className="bg-white p-2 px-3 shadow-sm rounded-pill border">
          <span className="small fw-bold" style={{ color: theme.gold }}>SYSTEM ACTIVE</span>
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="row g-4 mb-5">
        {[
          { label: "Total Students", value: users.length, icon: "bi-people", color: theme.navy },
          { label: "Course Completion", value: "84%", icon: "bi-journal-check", color: theme.success },
          { label: "Admin Access", value: users.filter((u) => u.role === "admin").length, icon: "bi-shield-lock", color: theme.gold }
        ].map((stat, i) => (
          <div key={i} className="col-md-4">
            <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "16px" }}>
              <div className="d-flex align-items-center">
                <div className="p-3 rounded-circle me-3" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                  <i className={`bi ${stat.icon} fs-4`}></i>
                </div>
                <div>
                  <h6 className="text-muted small fw-bold text-uppercase mb-1">{stat.label}</h6>
                  <h3 className="fw-bold mb-0" style={{ color: theme.navy }}>{stat.value}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* USER DATABASE TABLE */}
      <div className="card shadow-sm border-0" style={{ borderRadius: "20px", overflow: "hidden" }}>
        <div className="p-4 bg-white border-bottom d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0" style={{ color: theme.navy }}>Student Directory</h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={fetchUsers}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
        </div>
        <div className="table-responsive p-3">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                <th className="ps-4">STUDENT NAME</th>
                <th>EMAIL ADDRESS</th>
                <th>ROLE</th>
                <th className="text-end pe-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="ps-4 fw-semibold text-dark">{u.name}</td>
                  <td className="text-muted">{u.email}</td>
                  <td>
                    <span className={`badge px-3 py-2 rounded-pill ${u.role === 'admin' ? 'bg-danger-subtle text-danger' : 'bg-primary-subtle text-primary'}`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    <button className="btn btn-sm me-2 shadow-sm fw-bold px-3" style={{ backgroundColor: theme.navy, color: theme.white, borderRadius: "8px" }} onClick={() => handleView(u)}>
                       Analytics
                    </button>
                    <button className="btn btn-sm btn-outline-danger shadow-sm px-3" style={{ borderRadius: "8px" }} onClick={() => handleDelete(u._id)}>
                       Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p className="text-center py-5 text-muted">No users found in database.</p>}
        </div>
      </div>

      {/* ================= ANALYTICS MODAL ================= */}
      {selectedUser && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(10, 25, 47, 0.8)", backdropFilter: "blur(8px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1050, padding: "20px" }}>
          <div className="bg-white" style={{ width: "100%", maxWidth: "1000px", borderRadius: "24px", overflow: "hidden" }}>
            
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-light">
               <div>
                  <h5 className="fw-bold mb-0" style={{ color: theme.navy }}>{selectedUser.name}'s Performance</h5>
                  <span className="small text-muted">{selectedUser.email}</span>
               </div>
               <button className="btn-close" onClick={() => setSelectedUser(null)}></button>
            </div>

            <div className="p-4 p-md-5">
              <div className="row g-4">
                {/* PIE CHART */}
                <div className="col-lg-5">
                  <div className="card border p-3 h-100 shadow-sm" style={{ borderRadius: "16px" }}>
                    <h6 className="fw-bold mb-3">Topic Distribution</h6>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={5}>
                          {pieData.map((_, index) => <Cell key={index} fill={COLORS[index % 4]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* AREA CHART */}
                <div className="col-lg-7">
                  <div className="card border p-3 h-100 shadow-sm" style={{ borderRadius: "16px" }}>
                    <h6 className="fw-bold mb-3">Progress Timeline</h6>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={lineData}>
                        <defs>
                          <linearGradient id="adminColorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={theme.navy} stopOpacity={0.2}/>
                            <stop offset="95%" stopColor={theme.navy} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis dataKey="name" hide />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="score" stroke={theme.navy} strokeWidth={3} fill="url(#adminColorScore)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-light text-end">
              <button className="btn btn-secondary px-4 fw-bold" style={{ borderRadius: "10px" }} onClick={() => setSelectedUser(null)}>Close Analytics</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;