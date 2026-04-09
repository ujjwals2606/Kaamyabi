import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  Area,
  AreaChart
} from "recharts";

import { getPieData, getLineData } from "../api/api";

const Dashboard = () => {
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);

  const userId = localStorage.getItem("userId");

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    lightGray: "#f8f9fa",
    white: "#ffffff",
    softBlue: "#1e3a8a"
  };

  // Professional Color Palette for Charts
  const COLORS = ["#1e3a8a", "#c5a059", "#3b82f6", "#10b981", "#6366f1", "#f59e0b"];

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const pieRes = await getPieData(userId);
      const lineRes = await getLineData(userId);
      setPieData(pieRes.data || []);
      setLineData(lineRes.data || []);
    } catch (err) {
      console.log("Dashboard Error:", err);
    }
  };

  const stats = [
    { title: "Blogs Read", value: 12, icon: "📖", color: theme.softBlue },
    { title: "Quizzes", value: lineData.length, icon: "📝", color: theme.gold },
    { title: "Videos", value: pieData.length, icon: "🎬", color: "#10b981" },
    { title: "Learning Hours", value: "24h", icon: "⏳", color: "#6366f1" },
  ];

  return (
    <div className="container-fluid py-5 px-lg-5" style={{ backgroundColor: "#f4f7fe", minHeight: "100vh" }}>
      
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: theme.navy }}>Student Dashboard</h2>
          <p className="text-muted mb-0">Track your learning metrics and academic growth</p>
        </div>
        <div className="d-none d-md-block">
          <span className="badge p-2 px-3 shadow-sm" style={{ backgroundColor: theme.gold, color: theme.navy, borderRadius: "50px" }}>
            <i className="bi bi-star-fill me-2"></i>Premium Learner
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {stats.map((item, index) => (
          <div key={index} className="col-md-3 col-sm-6">
            <div
              className="card border-0 shadow-sm p-4 h-100"
              style={{ borderRadius: "16px", borderLeft: `5px solid ${item.color}` }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small fw-bold text-uppercase mb-1">{item.title}</p>
                  <h3 className="fw-bold mb-0" style={{ color: theme.navy }}>{item.value}</h3>
                </div>
                <div style={{ fontSize: "2rem", opacity: 0.8 }}>{item.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="row g-4 mb-5">
        {/* PIE CHART - Learning Distribution */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: "20px" }}>
            <h5 className="fw-bold mb-4" style={{ color: theme.navy }}>
              <i className="bi bi-pie-chart-fill me-2 text-primary"></i>Learning Topics
            </h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60} // Donut style for modern look
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LINE CHART - Progress */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: "20px" }}>
            <h5 className="fw-bold mb-4" style={{ color: theme.navy }}>
              <i className="bi bi-graph-up-arrow me-2 text-success"></i>Academic Growth
            </h5>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.softBlue} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={theme.softBlue} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke={theme.softBlue}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h5 className="fw-bold mb-4" style={{ color: theme.navy }}>Quick Navigation</h5>
      <div className="row g-3">
        {[
          { title: "Explore Blogs", link: "/user/blogs", icon: "📖", bg: "#eef2ff" },
          { title: "Start Quiz", link: "/user/quizzes", icon: "📝", bg: "#fff7ed" },
          { title: "Watch Tutorials", link: "/user/videos", icon: "🎬", bg: "#f0fdf4" },
          { title: "AI Learning Assist", link: "/user/chatbot", icon: "🤖", bg: "#faf5ff" },
        ].map((item, index) => (
          <div key={index} className="col-md-3 col-sm-6">
            <Link to={item.link} className="text-decoration-none h-100 d-block">
              <div
                className="card border-0 shadow-sm p-4 text-center action-card"
                style={{ 
                    borderRadius: "16px", 
                    backgroundColor: theme.white,
                    transition: "0.3s"
                }}
              >
                <div 
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: item.bg, fontSize: "1.5rem" }}
                >
                  {item.icon}
                </div>
                <h6 className="fw-bold mb-0" style={{ color: theme.navy }}>{item.title}</h6>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;