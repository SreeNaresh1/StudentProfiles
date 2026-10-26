import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api';

function Internships() {
  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadInternships() {
      try {
        setLoading(true);
        const data = await apiRequest('/api/internships');
        if (isMounted) {
          setInternships(data.internships || []);
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

    loadInternships();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = internships.filter((item) =>
    `${item.title} ${item.company} ${item.location} ${item.skills.join(' ')}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">OPEN ROLES</p>
          <h1>Available Internships</h1>
          <p className="muted">Choose a role to view details and apply.</p>
        </div>
        <span className="count">{filtered.length} roles</span>
      </div>

      <div className="filters">
        <input
          type="search"
          placeholder="Search by title, company, skill..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading && <p className="muted">Loading internships...</p>}
      {error && <div className="message error">{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="empty">
          <p>No internships match your search.</p>
        </div>
      )}

      <div className="grid">
        {filtered.map((internship) => (
          <article key={internship.id} className="internship-card">
            <div className="card-symbol">{internship.symbol}</div>
            <p className="company">{internship.company}</p>
            <h3>{internship.title}</h3>
            <p className="muted">
              {internship.location} · {internship.duration} · {internship.stipend}
            </p>
            <p className="description">{internship.description}</p>
            <div className="skills">
              {internship.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
            <Link to={`/internships/${internship.id}`} className="button primary full-button">
              View Details
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Internships;
