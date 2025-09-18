import { useState } from 'react';
import { signupUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    username: '',
    password: '',
    organization: '',
  });
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setErr('');
    try {
      const res = await signupUser(form);
      setMsg(res.message || 'Signup successful');
      setTimeout(() => navigate('/'), 800);
    } catch (error) {
      setErr(error?.response?.data?.message || error.message);
    }
    const res = await signupUser(form);
    setMsg(res.message || 'Signup successful');

    // 🔔 notify others
    window.dispatchEvent(new Event('auth:changed'));

    setTimeout(() => navigate('/'), 300);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Create Account</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        {['fullName', 'email', 'mobile', 'username', 'organization'].map(
          (name) => (
            <input
              key={name}
              name={name}
              value={form[name]}
              onChange={onChange}
              placeholder={name}
              className="w-full border rounded px-3 py-2"
              required
            />
          )
        )}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="password"
          className="w-full border rounded px-3 py-2"
          required
        />
        <button className="w-full bg-blue-600 text-white rounded py-2">
          Sign up
        </button>
      </form>
      {msg && <p className="text-green-600 mt-3">{msg}</p>}
      {err && <p className="text-red-600 mt-3">Error: {err}</p>}
    </div>
  );
}
