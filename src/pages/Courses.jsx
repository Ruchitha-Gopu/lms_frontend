import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import CourseCard from "../components/CourseCard";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const res = await API.get("/user/courses");
      setCourses(res.data || []);
    } catch (error) {
      console.log("Courses API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />

      <div className="container-fluid p-3 p-md-4 bg-light min-vh-100">
        <h2 className="mb-4">📚 My Courses</h2>

        {loading && (
          <div className="alert alert-info shadow-sm border-0">
            Loading courses...
          </div>
        )}

        <div className="row g-3 g-md-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course._id}
                className="col-12 col-sm-6 col-lg-4"
              >
                <CourseCard course={course} />
              </div>
            ))
          ) : (
            !loading && (
              <div className="col-12">
                <div className="alert alert-warning shadow-sm border-0">
                  No courses found
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;