import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiRequest } from '../api';

function InternshipDetails() {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadInternship() {
      try {
        setLoading(true);
        const data = await apiRequest(`/api/internships/${id}`);
        if (isMounted) {
          setInternship(data.internship);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadInternship();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <main className="container"><p className="muted">Loading internship...</p></main>;
  }

  if (error) {
    return (
      <main className="container">
        <Link to="/internships" className="back-link">← Back to internships</Link>
        <div className="message error">{error}</div>
      </main>
    );
  }

  if (!internship) {
    return null;
  }

  return (
    <main className="container detail-page">
      <Link to="/internships" className="back-link">← Back to internships</Link>
      <div className="detail-card">
        <div className="card-symbol">{internship.symbol}</div>
        <p className="company">{internship.company}</p>
        <h1>{internship.title}</h1>
        <p className="muted">
          {internship.location} · {internship.duration} · {internship.stipend}
        </p>
        <p>{internship.description}</p>

        <h2>Responsibilities</h2>
        <ul>
          {internship.responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>Requirements</h2>
        <ul>
          {internship.requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>Skills</h2>
        <div className="skills">
          {internship.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

        <hr />
        <Link
          to={`/apply?internship=${encodeURIComponent(internship.title)}`}
          className="button primary"
        >
          Apply Now
        </Link>
      </div>
    </main>
  );
}

export default InternshipDetails;
