import { useState, useEffect } from "react";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
    duration: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addCourse = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.thumbnail ||
      !formData.videoUrl ||
      !formData.duration
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/courses", formData);

      alert("Course Added Successfully");

      setFormData({
        title: "",
        description: "",
        thumbnail: "",
        videoUrl: "",
        duration: "",
      });

      fetchCourses();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed To Add Course");
    }
  };

  const deleteCourse = async (id) => {
    try {
      await API.delete(`/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container-fluid p-4">
        <h2 className="mb-4">📚 Manage Courses</h2>

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card shadow p-4 text-center">
              <h5>Total Courses</h5>
              <h2>{courses.length}</h2>
            </div>
          </div>
        </div>

        <div className="card shadow p-4 mb-4">
          <h4 className="mb-3">Add Course</h4>

          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="title"
                placeholder="Course Title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                className="form-control"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12 mb-3">
              <textarea
                name="description"
                placeholder="Course Description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="thumbnail"
                placeholder="Thumbnail URL"
                className="form-control"
                value={formData.thumbnail}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="videoUrl"
                placeholder="Embed Video URL"
                className="form-control"
                value={formData.videoUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="btn btn-primary w-100" onClick={addCourse}>
            Add Course
          </button>
        </div>

        {selectedVideo && (
          <div className="card shadow p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Course Video</h4>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedVideo("")}
              >
                Close Video
              </button>
            </div>

            <iframe
              width="100%"
              height="450"
              src={selectedVideo}
              title="Course Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="row">
          {courses.map((course) => (
            <div className="col-lg-4 col-md-6 mb-4" key={course._id}>
              <div className="card shadow h-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  height="200"
                  style={{ objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5>{course.title}</h5>

                  <p>{course.description}</p>

                  <p>
                    <strong>Duration:</strong> {course.duration}
                  </p>

                  <button
                    className="btn btn-success me-2"
                    onClick={() => setSelectedVideo(course.videoUrl)}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCourse(course._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ManageCourses;