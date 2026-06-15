import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    API.get("/user/courses")
      .then((res) => {
        const found = res.data.find(
          (c) => c._id === id
        );

        setCourse(found);
      });
  }, [id]);

  if (!course) return <h3>Loading...</h3>;

  return (
    <div className="container mt-4">

      <h2>{course.title}</h2>

       <iframe
  width="100%"
  height="500"
  src={course.videoUrl}
  title={course.title}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allow></iframe>

      <p className="mt-3">
        {course.description}
      </p>

    </div>
  );
}

export default CourseDetails;