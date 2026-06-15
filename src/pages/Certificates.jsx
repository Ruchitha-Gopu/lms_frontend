import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import { getLoggedUser } from "../utils/getUser";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = getLoggedUser();

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      const res = await API.get(`/certificates/user/${user.id}`);
      setCertificates(res.data || []);
    } catch (error) {
      console.log("Certificates Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar />

      <main className="flex-grow-1 p-3 p-md-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">🏆 My Certificates</h2>
            <p className="text-muted mb-0">
              View all certificate details from backend
            </p>
          </div>

          <div className="badge bg-primary fs-6 mt-3 mt-md-0 px-3 py-2">
            Total: {certificates.length}
          </div>
        </div>

        {loading ? (
          <div className="card border-0 shadow-sm p-4 text-center">
            <div className="spinner-border text-primary mb-3"></div>
            <p className="mb-0 text-muted">Loading certificates...</p>
          </div>
        ) : certificates.length > 0 ? (
          <div className="row g-4">
            {certificates.map((item) => (
              <div
                className="col-12 col-md-6 col-xl-4"
                key={item._id}
              >
                <div className="card border-0 shadow-sm h-100 certificate-card">
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="text-center mb-3">
                      <div className="certificate-icon mx-auto mb-3">🎓</div>

                      <h5 className="fw-bold mb-1">
                        {item.courseName}
                      </h5>

                      <p className="text-muted small mb-0">
                        {item.courseName} Course Completed
                      </p>
                    </div>

                    <hr />

          
                    <p className="mb-2 small">
                      <strong>User ID:</strong>
                      <br />
                      <span className="text-muted text-break">
                        {item.userId}
                      </span>
                    </p>

                    <p className="mb-2 small">
                      <strong>Certificate ID:</strong>
                      <br />
                      <span className="text-muted">
                        {item.certificateId}
                      </span>
                    </p>

                    <p className="mb-2 small">
                      <strong>Course Name:</strong>
                      <br />
                      <span className="text-muted">
                        {item.courseName}
                      </span>
                    </p>

                    <p className="mb-2 small">
                      <strong>Issue Date:</strong>
                      <br />
                      <span className="text-muted">
                        {item.issueDate}
                      </span>
                    </p>

                    <p className="mb-2 small">
                      <strong>Status:</strong>
                      <br />
                      <span className="badge bg-success">
                        {item.status || "Issued"}
                      </span>
                    </p>

                    <p className="mb-2 small">
                      <strong>Certificate URL:</strong>
                      <br />
                      <span className="text-muted text-break">
                        {item.certificateUrl}
                      </span>
                    </p>

                    
                    

                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary w-100 mt-auto"
                    >
                      Download Certificate
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card border-0 shadow-sm p-5 text-center">
            <div className="display-4 mb-3">📄</div>

            <h4 className="fw-bold">No Certificates Found</h4>

            <p className="text-muted mb-0">
              No certificates found for {user?.name || "this user"}.
            </p>
          </div>
        )}
      </main>

      <style>
        {`
          .certificate-card {
            transition: all 0.3s ease;
            border-radius: 18px;
          }

          .certificate-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12) !important;
          }

          .certificate-icon {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: linear-gradient(135deg, #0d6efd, #6610f2);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
          }
        `}
      </style>
    </div>
  );
}

export default Certificates;