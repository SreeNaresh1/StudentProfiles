import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">SI</span>
        Student Internship Portal
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/internships">Internships</NavLink>
        <NavLink to="/apply">Apply</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
