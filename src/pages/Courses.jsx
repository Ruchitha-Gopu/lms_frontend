import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import CourseCard from "../components/CourseCard";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/user/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />

      <div className="container-fluid p-3 p-md-4">
        <h2 className="mb-4">📚 My Courses</h2>

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
            <div className="col-12">
              <div className="alert alert-warning">
                No courses found
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;