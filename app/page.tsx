"use client";

import React from 'react';
import CryptoTable from '../components/CryptoTable';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-8">
      <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#2563eb' }}>Cryptocurrency Dashboard</h1>
      <p style={{ fontSize: '1.125rem', fontWeight: '500', color: '#4b5563', marginTop: '0.5rem' }}>Track the top 20 cryptocurrencies in real-time</p>
      </header>
      <CryptoTable />
    </div>
  );
}
