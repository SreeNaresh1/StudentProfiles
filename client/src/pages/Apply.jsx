import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiRequest } from '../api';

const initialForm = {
  studentName: '',
  email: '',
  rollNumber: '',
  internship: '',
};

function validate(form) {
  const errors = {};
  if (!form.studentName.trim()) {
    errors.studentName = 'Name is required';
  } else if (form.studentName.trim().length < 2) {
    errors.studentName = 'Name must contain at least two characters';
  }
  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (!form.rollNumber.trim()) {
    errors.rollNumber = 'Roll number is required';
  }
  if (!form.internship.trim()) {
    errors.internship = 'Select an internship';
  }
  return errors;
}

function Apply() {
  const [searchParams] = useSearchParams();
  const [internships, setInternships] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadInternships() {
      try {
        const data = await apiRequest('/api/internships');
        if (isMounted) {
          setInternships((data.internships || []).map((item) => item.title));
          const selected = searchParams.get('internship');
          if (selected) {
            setForm((current) => ({ ...current, internship: selected }));
          }
        }
      } catch (err) {
        if (isMounted) {
          setMessage({ type: 'error', text: err.message });
        }
      }
    }

    loadInternships();
    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const data = await apiRequest('/api/applications', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setMessage({
        type: 'success',
        text: data.message || 'Application submitted successfully!',
      });
      setForm(initialForm);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container form-layout">
      <div className="form-intro">
        <p className="eyebrow">APPLICATION</p>
        <h1>Apply for an Internship</h1>
        <p className="muted">Fill in your details and select the internship you want.</p>
      </div>

      <form className="application-form" onSubmit={handleSubmit} noValidate>
        <h2>Student Details</h2>

        {message && <div className={`message ${message.type}`}>{message.text}</div>}

        <label>
          Student Name
          <input
            name="studentName"
            value={form.studentName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.studentName && (
            <small style={{ color: '#a72e36' }}>{errors.studentName}</small>
          )}
        </label>

        <label>
          Email ID
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email && <small style={{ color: '#a72e36' }}>{errors.email}</small>}
        </label>

        <label>
          Roll Number
          <input
            name="rollNumber"
            value={form.rollNumber}
            onChange={handleChange}
            placeholder="Enter your roll number"
          />
          {errors.rollNumber && (
            <small style={{ color: '#a72e36' }}>{errors.rollNumber}</small>
          )}
        </label>

        <label>
          Selected Internship
          <select name="internship" value={form.internship} onChange={handleChange}>
            <option value="">Select an internship</option>
            {internships.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
          {errors.internship && (
            <small style={{ color: '#a72e36' }}>{errors.internship}</small>
          )}
        </label>

        <button type="submit" className="button primary submit-button" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
        <p className="form-note">
          All fields are required. Duplicate roll number and internship combinations are rejected.
        </p>
      </form>
    </main>
  );
}

export default Apply;
