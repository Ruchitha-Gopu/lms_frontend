function CoursesSection() {
  const courses = [
    "React JS",
    "Node JS",
    "MongoDB",
    "Redux"
  ];

  return (
    <div>
      <h2>My Courses</h2>

      {courses.map((course, index) => (
        <div key={index} className="course">
          {course}
        </div>
      ))}
    </div>
  );
}

export default CoursesSection;