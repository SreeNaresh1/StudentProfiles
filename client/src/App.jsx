import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Internships from './pages/Internships';
import InternshipDetails from './pages/InternshipDetails';
import Apply from './pages/Apply';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/internships/:id" element={<InternshipDetails />} />
          <Route path="/apply" element={<Apply />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
