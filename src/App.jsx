import "./App.css";

const student1 = {
  name: "Anu",
  department: "CSE",
  year: "3rd Year",
};

const student2 = {
  name: "Bala",
  department: "Computer Science",
  year: "3rd Year",
};

function Header() {
  return (
    <header className="header">
      <h1>Student Management System</h1>
      <p>Student Profile Management</p>
    </header>
  );
}

function StudentProfile({ name, department, year }) {
  return (
    <div className="student-profile">
      <h2>{name}</h2>

      <p>
        <strong>Department:</strong> {department}
      </p>

      <p>
        <strong>Year:</strong> {year}
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      © 2026 Student Management System
    </footer>
  );
}

function App() {
  return (
    <div className="app">
      <Header />

      <main className="content">
        <section>
          <h2 className="student-title">Student 1</h2>

          <StudentProfile
            name={student1.name}
            department={student1.department}
            year={student1.year}
          />
        </section>

        <section>
          <h2 className="student-title">Student 2</h2>

          <StudentProfile
            name={student2.name}
            department={student2.department}
            year={student2.year}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;