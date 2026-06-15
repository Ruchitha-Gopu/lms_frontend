import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";

function Quiz() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (!quizStarted || quizFinished || showAnswer) return;

    if (timeLeft === 0) {
      handleAnswer();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizStarted, quizFinished, showAnswer]);

  const startQuiz = async () => {
    if (!topic) {
      alert("Select Topic");
      return;
    }

    const res = await API.get(`/quiz/${topic}`);

    if (res.data.length === 0) {
      alert("No questions found for this topic");
      return;
    }

    setQuestions(res.data);
    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(60);
  };

  const handleAnswer = () => {
    const correctAnswer = questions[currentQuestion]?.answer;

    if (selectedAnswer === correctAnswer) {
      setScore((prev) => prev + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setShowAnswer(true);
  };

  const nextQuestion = () => {
    setShowAnswer(false);
    setSelectedAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(60);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setTopic("");
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setTimeLeft(60);
    setQuizStarted(false);
    setQuizFinished(false);
    setShowAnswer(false);
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <Sidebar />

      <div className="container-fluid p-3 p-md-4">
        <h2 className="mb-4">🧠 LMS Quiz</h2>

        {!quizStarted && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card p-4 shadow border-0">
                <h4 className="mb-3">Select Topic</h4>

                <select
                  className="form-select mb-3"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  <option value="">Select Topic</option>
                  <option value="React">React</option>
                  <option value="NodeJS">NodeJS</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="HTMLCSS">HTML & CSS</option>
                  <option value="Bootstrap">Bootstrap</option>
                </select>

                <button className="btn btn-primary w-100" onClick={startQuiz}>
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        {quizStarted && !quizFinished && questions.length > 0 && (
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="card shadow border-0 p-3 p-md-4">
                <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
                  <h5>
                    Question {currentQuestion + 1} / {questions.length}
                  </h5>

                  <h5 className="text-danger">⏰ {timeLeft}s</h5>
                </div>

                <div className="progress mb-3">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / questions.length) * 100
                      }%`,
                    }}
                  />
                </div>

                <hr />

                <h4 className="mb-4">
                  {questions[currentQuestion].question}
                </h4>

                <div className="row">
                  {questions[currentQuestion].options.map((option) => (
                    <div className="col-12 col-md-6 mb-3" key={option}>
                      <label
                        className={`border rounded p-3 w-100 ${
                          selectedAnswer === option
                            ? "bg-primary text-white"
                            : "bg-light"
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          type="radio"
                          className="form-check-input me-2"
                          name="answer"
                          value={option}
                          checked={selectedAnswer === option}
                          onChange={() => setSelectedAnswer(option)}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>

                {!showAnswer ? (
                  <button
                    className="btn btn-success mt-2 w-100"
                    onClick={handleAnswer}
                    disabled={!selectedAnswer && timeLeft !== 0}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <>
                    <div className="mt-3">
                      {isCorrect ? (
                        <div className="alert alert-success">
                          ✅ Correct Answer
                        </div>
                      ) : (
                        <div className="alert alert-danger">
                          ❌ Wrong Answer
                        </div>
                      )}

                      <div className="alert alert-info">
                        Correct Answer:{" "}
                        <strong>{questions[currentQuestion].answer}</strong>
                      </div>
                    </div>

                    <button className="btn btn-primary w-100" onClick={nextQuestion}>
                      Next Question
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {quizFinished && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card p-4 p-md-5 shadow border-0 text-center">
                <h2>🎉 Quiz Completed</h2>

                <h3 className="mt-3">
                  Score: {score} / {questions.length}
                </h3>

                <div className="progress mt-4" style={{ height: "25px" }}>
                  <div
                    className="progress-bar"
                    style={{
                      width: `${(score / questions.length) * 100}%`,
                    }}
                  >
                    {Math.round((score / questions.length) * 100)}%
                  </div>
                </div>

                <button
                  className="btn btn-primary mt-4"
                  onClick={restartQuiz}
                >
                  Take Another Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;