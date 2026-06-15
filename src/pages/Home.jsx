import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "20px" }}>
          <h1>Student Dashboard</h1>

          <div>
            <h3>📚 Courses: 5</h3>
            <h3>🎥 Videos: 20</h3>
            <h3>📝 Assignments: 3</h3>
            <h3>🏆 Certificates: 2</h3>
          </div>
        </div>
      </div>
    </>
  );
}