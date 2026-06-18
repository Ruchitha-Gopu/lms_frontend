import { useEffect, useState } from "react";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Reports() {
  const [reports, setReports] = useState({
    users: 0,
    courses: 0,
    assignments: 0,
    quizzes: 0,
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await API.get("/admin/reports");

      setReports({
        users: res.data.users || 0,
        courses: res.data.courses || 0,
        assignments: res.data.assignments || 0,
        quizzes: res.data.quizzes || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const chartData = [
    { name: "Users", value: reports.users },
    { name: "Courses", value: reports.courses },
    { name: "Assignments", value: reports.assignments },
    { name: "Quizzes", value: reports.quizzes },
  ];

  const COLORS = ["#0d6efd", "#198754", "#ffc107", "#dc3545"];

  return (
    <>
      <AdminNavbar />

      <div className="container-fluid p-4">
        <h2 className="mb-4">📈 LMS Reports & Analytics</h2>

        <div className="row g-4 mb-4">
          <div className="col-lg-3 col-md-6">
            <div className="card shadow p-4 text-center border-0">
              <h5>Total Users</h5>
              <h2>{reports.users}</h2>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card shadow p-4 text-center border-0">
              <h5>Total Courses</h5>
              <h2>{reports.courses}</h2>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card shadow p-4 text-center border-0">
              <h5>Total Assignments</h5>
              <h2>{reports.assignments}</h2>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card shadow p-4 text-center border-0">
              <h5>Total Quizzes</h5>
              <h2>{reports.quizzes}</h2>
            </div>
          </div>
        </div>

        <div className="card shadow p-4 border-0">
          <h4 className="mb-3">Platform Analytics</h4>

          <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;