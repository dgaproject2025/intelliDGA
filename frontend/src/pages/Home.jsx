import React from 'react';
import HealthCheck from '../components/HealthCheck';
import AuthPing from '../components/AuthPing';

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to intelliDGA</h1>
      <HealthCheck />
      <AuthPing />
    </div>
  );
}
