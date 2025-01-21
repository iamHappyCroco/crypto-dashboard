"use client";

import React, { useState, useEffect } from 'react';
import { useCryptoStore } from '../stores/useCryptoStore';

const CryptoTable = () => {
  const { cryptos, loading, fetchCryptos } = useCryptoStore();
  const [filter, setFilter] = useState(''); // 添加 filter 状态

  useEffect(() => {
    fetchCryptos();
  }, [fetchCryptos]);

  if (loading) return <div className="text-center">Loading...</div>;

  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(filter.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* 改进后的输入框 */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by name or symbol"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* 表格展示 */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Icon</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Symbol</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Current Price</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">24h Change</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCryptos.map((crypto, index) => (
              <tr
                key={crypto.id}
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-100`}
              >
                <td className="border border-gray-300 px-4 py-2">
                  <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
                </td>
                <td className="border border-gray-300 px-4 py-2 font-medium">{crypto.name}</td>
                <td className="border border-gray-300 px-4 py-2">{crypto.symbol.toUpperCase()}</td>
                <td className="border border-gray-300 px-4 py-2">${crypto.current_price.toFixed(2)}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    crypto.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="border border-gray-300 px-4 py-2">${crypto.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
