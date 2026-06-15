import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <div
      className="card shadow-sm border-0 h-100"
      style={{
        borderRadius: "15px",
        overflow: "hidden",
      }}
    >
      <img
        src={course.thumbnail}
        alt={course.title}
        style={{
          height: "180px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">

        <h5
          className="fw-bold"
          style={{
            minHeight: "50px",
          }}
        >
          {course.title}
        </h5>

        <p
          className="text-muted"
          style={{
            minHeight: "70px",
            overflow: "hidden",
          }}
        >
          {course.description}
        </p>

        <p>
          <strong>Duration:</strong>{" "}
          {course.duration}
        </p>

        <div className="mt-auto">

          <Link
            to={`/courses/${course._id}`}
            className="btn btn-primary w-100"
          >
            View Course
          </Link>

        </div>

      </div>
    </div>
  );
}

export default CourseCard;