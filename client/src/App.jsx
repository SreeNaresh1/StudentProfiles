
import { useEffect, useState } from "react";
import {
  Link,
  Routes,
  Route,
  useParams,
  useNavigate
} from "react-router-dom";
import "./App.css";

// Navigation component
function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Intern<span>Connect</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="/#internships">Internships</a>
        <Link to="/applications">Applications</Link>
      </div>

      <Link to="/" className="nav-button">
        Explore Jobs
      </Link>
    </nav>
  );
}

// Home page: display available internships
function Home() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/internships")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load internships");
        return res.json();
      })
      .then((data) => setInternships(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">YOUR CAREER STARTS HERE</span>

          <h1>
            Find Your First
            <span> Internship</span>
          </h1>

          <p>
            Explore opportunities, develop your skills and
            take the first step towards your professional career.
          </p>

          <a href="#internships" className="primary-button">
            Explore Internships
          </a>

          <div className="hero-stats">
            <div>
              <strong>{internships.length}+</strong>
              <span>Opportunities</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Learning Focused</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Access</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card">
            <div className="visual-top">
              <span>CAREER OPPORTUNITY</span>
              <span className="status-dot">OPEN</span>
            </div>

            <div className="visual-symbol">IC</div>

            <h2>Build Your Future</h2>
            <p>Learn. Work. Grow.</p>

            <div className="visual-line"></div>

            <div className="visual-bottom">
              <span>Student Internship Portal</span>
              <strong>2026</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div>
          <strong>01</strong>
          <h3>Explore</h3>
          <p>Find internships matching your interests.</p>
        </div>

        <div>
          <strong>02</strong>
          <h3>Apply</h3>
          <p>Submit your application in a few steps.</p>
        </div>

        <div>
          <strong>03</strong>
          <h3>Grow</h3>
          <p>Start building your professional experience.</p>
        </div>
      </section>

      <section className="internship-section" id="internships">
        <div className="section-heading">
          <div>
            <span className="eyebrow">OPPORTUNITIES</span>
            <h2>Available Internships</h2>
            <p>Choose an opportunity to explore its details.</p>
          </div>

          <span className="count-badge">
            {internships.length} Positions
          </span>
        </div>

        {loading ? (
          <div className="message-box">Loading internships...</div>
        ) : error ? (
          <div className="message-box error-text">{error}</div>
        ) : internships.length === 0 ? (
          <div className="message-box">No internships available.</div>
        ) : (
          <div className="internship-grid">
            {internships.map((item) => (
              <article className="internship-card" key={item.id}>
                <div className="card-top">
                  <div className="company-icon">
                    {item.company.charAt(0)}
                  </div>
                  <span className="type-badge">{item.type}</span>
                </div>

                <span className="card-company">{item.company}</span>
                <h3>{item.title}</h3>

                <div className="card-meta">
                  <span>{item.location}</span>
                  <span>{item.duration}</span>
                </div>

                <p>{item.description}</p>

                <div className="skill-list">
                  {item.skills.slice(0, 3).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <Link
                  to={`/internship/${item.id}`}
                  className="card-link"
                >
                  View Details
                  <span>→</span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <Link to="/" className="logo">
          Intern<span>Connect</span>
        </Link>
        <p>Connecting students with career opportunities.</p>
      </footer>
    </>
  );
}

// Internship details page
function InternshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/internships/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Internship not found");
        return res.json();
      })
      .then((data) => setInternship(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="message-box">Loading details...</div>;
  }

  if (error || !internship) {
    return (
      <div className="message-box error-text">
        {error || "Internship not found"}
        <br />
        <Link to="/">Return Home</Link>
      </div>
    );
  }

  return (
    <section className="details-page">
      <Link to="/" className="back-link">
        ← Back to Internships
      </Link>

      <div className="details-card">
        <div className="company-icon large">
          {internship.company.charAt(0)}
        </div>

        <span className="eyebrow">{internship.company}</span>
        <h1>{internship.title}</h1>

        <div className="details-meta">
          <span>{internship.location}</span>
          <span>{internship.duration}</span>
          <span>{internship.type}</span>
        </div>

        <h3>About this Internship</h3>
        <p>{internship.description}</p>

        <h3>Required Skills</h3>
        <div className="skill-list">
          {internship.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

        <button
          className="primary-button"
          onClick={() => navigate(`/apply/${internship.id}`)}
        >
          Apply Now
        </button>
      </div>
    </section>
  );
}

// Application form
function ApplicationForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [internships, setInternships] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(id || "");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/internships")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load internships");
        return res.json();
      })
      .then((data) => {
        setInternships(data);

        if (id && !data.some((item) => item.id === id)) {
          setMessage("Selected internship was not found.");
        }
      })
      .catch((err) => setMessage(err.message));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    if (
      !name.trim() ||
      !email.trim() ||
      !rollNumber.trim() ||
      !selectedInternship
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!/^[a-zA-Z0-9-]{3,20}$/.test(rollNumber.trim())) {
      setMessage("Roll number must be 3-20 characters.");
      return;
    }

    const internship = internships.find(
      (item) => item.id === selectedInternship
    );

    if (!internship) {
      setMessage("Please select a valid internship.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          rollNumber: rollNumber.trim(),
          internship: internship.title
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Application failed.");
      }

      setSuccess(true);
      setMessage("Your application has been submitted successfully!");

      setName("");
      setEmail("");
      setRollNumber("");
      setSelectedInternship("");
    } catch (err) {
      setSuccess(false);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="form-page">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      <div className="form-card">
        <div className="form-heading">
          <span className="eyebrow">STUDENT REGISTRATION</span>
          <h1>Internship Application</h1>
          <p>Enter your details to apply for an internship.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Student Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              pattern="[A-Za-z ]+"
              title="Enter a name using letters and spaces only"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <input
              id="email"
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number</label>
            <input
              id="rollNumber"
              type="text"
              placeholder="Enter your roll number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              minLength={3}
              maxLength={20}
              pattern="[A-Za-z0-9-]{3,20}"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="internship">Select Internship</label>
            <select
              id="internship"
              value={selectedInternship}
              onChange={(e) => setSelectedInternship(e.target.value)}
              required
            >
              <option value="">Choose an internship</option>

              {internships.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          {message && (
            <div className={success ? "success-message" : "error-message"}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className="primary-button submit-button"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>

        {success && (
          <button
            className="secondary-action"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        )}
      </div>
    </section>
  );
}

// View submitted applications
function Applications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/applications")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load applications");
        return res.json();
      })
      .then((data) => setApplications(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="details-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">STUDENT RECORDS</span>
          <h2>Submitted Applications</h2>
        </div>
      </div>

      {error ? (
        <div className="message-box error-text">{error}</div>
      ) : applications.length === 0 ? (
        <div className="message-box">No applications submitted yet.</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Roll Number</th>
                <th>Internship</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.rollNumber}</td>
                  <td>{item.internship}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

// Main application with React Router
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/internship/:id"
          element={<InternshipDetails />}
        />
        <Route path="/apply/:id" element={<ApplicationForm />} />
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/applications" element={<Applications />} />
        <Route
          path="*"
          element={
            <div className="message-box">
              Page not found. <Link to="/">Go Home</Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
