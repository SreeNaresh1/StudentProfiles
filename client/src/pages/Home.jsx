import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="app-shell">
      <section className="hero">
        <p className="eyebrow">STUDENT INTERNSHIP PORTAL</p>
        <h1>Find the internship that fits your future</h1>
        <p>
          Explore available internships, review role details, and submit your application in one
          simple flow.
        </p>
        <div>
          <Link to="/internships" className="button primary">
            Browse Internships
          </Link>
        </div>
        <div className="stats">
          <div>
            <strong>6</strong>
            <span>Open Roles</span>
          </div>
          <div>
            <strong>Remote</strong>
            <span>Hybrid and On-site</span>
          </div>
          <div>
            <strong>Fast</strong>
            <span>Simple Application</span>
          </div>
        </div>
      </section>
      <main className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">GET STARTED</p>
            <h2>How it works</h2>
          </div>
        </div>
        <div className="grid">
          <article className="internship-card">
            <div className="card-symbol">1</div>
            <h3>Browse</h3>
            <p className="description">View all available internships and compare roles.</p>
          </article>
          <article className="internship-card">
            <div className="card-symbol">2</div>
            <h3>Review Details</h3>
            <p className="description">Open a role to read responsibilities and requirements.</p>
          </article>
          <article className="internship-card">
            <div className="card-symbol">3</div>
            <h3>Apply</h3>
            <p className="description">Submit your details and receive confirmation.</p>
          </article>
        </div>
      </main>
    </div>
  );
}

export default Home;
