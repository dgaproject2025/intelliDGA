import { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ emailOrUsername: '', password: '' });
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setErr('');
    try {
      const payload = form.emailOrUsername.includes('@')
        ? { email: form.emailOrUsername, password: form.password }
        : { username: form.emailOrUsername, password: form.password };

      const res = await loginUser(payload);
      setMsg(res.message || 'Login successful');
      setTimeout(() => navigate('/'), 800);
    } catch (error) {
      setErr(error?.response?.data?.message || error.message);
    }
    // inside onSubmit success block
    const res = await loginUser(payload);
    setMsg(res.message || 'Login successful');

    // 🔔 notify others (e.g., Header/UserMenu) that auth state changed
    window.dispatchEvent(new Event('auth:changed'));

    setTimeout(() => navigate('/'), 300);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          name="emailOrUsername"
          value={form.emailOrUsername}
          onChange={onChange}
          placeholder="email or username"
          className="w-full border rounded px-3 py-2"
          required
        />
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
          Login
        </button>
      </form>
      {msg && <p className="text-green-600 mt-3">{msg}</p>}
      {err && <p className="text-red-600 mt-3">Error: {err}</p>}
    </div>
  );
}
