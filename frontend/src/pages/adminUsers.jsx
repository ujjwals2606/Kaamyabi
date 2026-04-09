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

const AdminUsers = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    lightGray: "#f4f7fe",
    danger: "#dc3545"
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
    if (!window.confirm("Are you sure? This will permanently remove the user and their records.")) return;
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

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-5 px-lg-5" style={{ backgroundColor: theme.lightGray, minHeight: "100vh" }}>
      
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: theme.navy }}>User <span style={{ color: theme.gold }}>Intelligence</span> 👤</h2>
          <p className="text-muted small">Manage student accounts and analyze learning engagement.</p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <div className="position-relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="form-control shadow-sm border-0 px-4"
              style={{ borderRadius: "50px", width: "300px", height: "45px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="btn shadow-sm px-4 fw-bold"
            style={{ backgroundColor: theme.navy, color: theme.white, borderRadius: "50px" }}
            onClick={() => navigate("/user/add")}
          >
            <i className="bi bi-person-plus-fill me-2"></i> Add Student
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="card shadow-sm border-0" style={{ borderRadius: "20px", overflow: "hidden" }}>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #eee" }}>
              <tr className="small fw-bold text-muted">
                <th className="ps-4 py-3">#</th>
                <th className="py-3">STUDENT INFO</th>
                <th className="py-3">EMAIL ADDRESS</th>
                <th className="py-3">STATUS</th>
                <th className="py-3 text-end pe-4">MANAGEMENT</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u, index) => (
                  <tr key={u._id} style={{ borderBottom: "1px solid #f1f1f1" }}>
                    <td className="ps-4 text-muted">{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle me-3 d-flex align-items-center justify-content-center" 
                             style={{ width: "40px", height: "40px", backgroundColor: theme.navy + "15", color: theme.navy }}>
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="fw-bold text-dark">{u.name}</span>
                      </div>
                    </td>
                    <td className="text-muted">{u.email}</td>
                    <td>
                      <span className="badge rounded-pill bg-success-subtle text-success px-3">Active</span>
                    </td>
                    <td className="text-end pe-4">
                      <button className="btn btn-sm me-2 shadow-sm fw-bold px-3" 
                              style={{ backgroundColor: theme.gold, color: theme.navy, borderRadius: "8px" }}
                              onClick={() => handleView(u)}>
                        Analytics
                      </button>
                      <button className="btn btn-sm btn-outline-danger shadow-sm px-3" 
                              style={{ borderRadius: "8px" }}
                              onClick={() => handleDelete(u._id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-5 text-center text-muted">No users matching your search criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= ANALYTICS MODAL ================= */}
      {selectedUser && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(10, 25, 47, 0.85)", 
                     backdropFilter: "blur(6px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1060 }}>
          <div className="bg-white shadow-lg" style={{ width: "90%", maxWidth: "1000px", borderRadius: "28px", overflow: "hidden" }}>
            
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-light">
               <div>
                  <h5 className="fw-bold mb-0" style={{ color: theme.navy }}>Performance Overview: {selectedUser.name}</h5>
                  <span className="small text-muted">{selectedUser.email}</span>
               </div>
               <button className="btn-close" onClick={() => setSelectedUser(null)}></button>
            </div>

            <div className="p-4 p-md-5">
              <div className="row g-4">
                {/* Engagement Pie */}
                <div className="col-lg-5">
                  <div className="card border-0 bg-light p-4 h-100" style={{ borderRadius: "20px" }}>
                    <h6 className="fw-bold mb-4 text-center">Video Engagement Area</h6>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={85} paddingAngle={5}>
                          {pieData.map((_, index) => <Cell key={index} fill={COLORS[index % 4]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Score Growth Line */}
                <div className="col-lg-7">
                  <div className="card border-0 bg-light p-4 h-100" style={{ borderRadius: "20px" }}>
                    <h6 className="fw-bold mb-4 text-center">Academic Quiz Progress</h6>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={lineData}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={theme.gold} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={theme.gold} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                        <XAxis dataKey="name" hide />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="score" stroke={theme.gold} strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 text-center border-top">
               <button className="btn btn-navy px-5 fw-bold" style={{ backgroundColor: theme.navy, color: theme.white, borderRadius: "10px" }} 
                       onClick={() => setSelectedUser(null)}>Return to Directory</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminUsers;