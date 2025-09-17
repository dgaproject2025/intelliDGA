import { useEffect, useState } from 'react';
import { getAuthPing } from '../services/api';

export default function AuthPing() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getAuthPing();
        setStatus(data);
      } catch (err) {
        setError(
          err?.response?.data?.message || err.message || 'Request failed'
        );
      }
    })();
  }, []);

  return (
    <div style={{ padding: '1rem', marginTop: '1rem' }}>
      <h2>Auth Router Check</h2>
      {status && <pre>{JSON.stringify(status, null, 2)}</pre>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
