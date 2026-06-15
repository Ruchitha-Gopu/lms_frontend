import { useEffect, useState } from "react";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";

function ManageQuiz() {
  const [quizzes, setQuizzes] = useState([]);

  const [formData, setFormData] = useState({
    topic: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await API.get("/quiz");
      setQuizzes(res.data);
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

  const addQuestion = async () => {
    if (
      !formData.topic ||
      !formData.question ||
      !formData.option1 ||
      !formData.option2 ||
      !formData.option3 ||
      !formData.option4 ||
      !formData.answer
    ) {
      alert("Please fill all fields");
      return;
    }

    const quizData = {
      topic: formData.topic,
      question: formData.question,
      options: [
        formData.option1,
        formData.option2,
        formData.option3,
        formData.option4,
      ],
      answer: formData.answer,
    };

    try {
      await API.post("/quiz", quizData);

      alert("Quiz Question Added");

      setFormData({
        topic: "",
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      });

      fetchQuizzes();
    } catch (error) {
      console.log(error);
      alert("Failed to add question");
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await API.delete(`/quiz/${id}`);
      fetchQuizzes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container-fluid p-4">
        <h2 className="mb-4">❓ Manage Quiz</h2>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="card shadow p-4 text-center">
              <h5>Total Questions</h5>
              <h2>{quizzes.length}</h2>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="card shadow p-4 text-center">
              <h5>Total Topics</h5>
              <h2>
                {
                  [
                    ...new Set(
                      quizzes.map((q) => q.topic)
                    ),
                  ].length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="card shadow p-4 mb-4">
          <h4 className="mb-3">
            Add New Quiz Question
          </h4>

          <div className="row">
            <div className="col-md-4 mb-3">
              <select
                name="topic"
                className="form-control"
                value={formData.topic}
                onChange={handleChange}
              >
                <option value="">Select Topic</option>
                <option value="React">React</option>
                <option value="NodeJS">NodeJS</option>
                <option value="JavaScript">
                  JavaScript
                </option>
                <option value="HTMLCSS">
                  HTML & CSS
                </option>
                <option value="Bootstrap">
                  Bootstrap
                </option>
              </select>
            </div>

            <div className="col-md-8 mb-3">
              <input
                type="text"
                name="question"
                className="form-control"
                placeholder="Enter Question"
                value={formData.question}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="option1"
                className="form-control"
                placeholder="Option 1"
                value={formData.option1}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="option2"
                className="form-control"
                placeholder="Option 2"
                value={formData.option2}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="option3"
                className="form-control"
                placeholder="Option 3"
                value={formData.option3}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="option4"
                className="form-control"
                placeholder="Option 4"
                value={formData.option4}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12 mb-3">
              <input
                type="text"
                name="answer"
                className="form-control"
                placeholder="Correct Answer"
                value={formData.answer}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={addQuestion}
          >
            Add Question
          </button>
        </div>

        <div className="card shadow p-4">
          <h4 className="mb-3">Quiz Question List</h4>

          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Topic</th>
                  <th>Question</th>
                  <th>Options</th>
                  <th>Answer</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {quizzes.length > 0 ? (
                  quizzes.map((quiz) => (
                    <tr key={quiz._id}>
                      <td>{quiz.topic}</td>
                      <td>{quiz.question}</td>
                      <td>
                        {quiz.options.map((opt, index) => (
                          <div key={index}>
                            {index + 1}. {opt}
                          </div>
                        ))}
                      </td>
                      <td>
                        <span className="badge bg-success">
                          {quiz.answer}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteQuestion(quiz._id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center"
                    >
                      No Quiz Questions Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageQuiz;