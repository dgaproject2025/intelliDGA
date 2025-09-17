import { useEffect, useState } from 'react';
import { getHealth } from '../services/api';

export default function HealthCheck() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getHealth();
        setStatus(data);
      } catch (err) {
        setError(
          err?.response?.data?.message || err.message || 'Request failed'
        );
      }
    })();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Backend Health</h2>
      {status && <pre>{JSON.stringify(status, null, 2)}</pre>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
