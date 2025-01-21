import { create } from 'zustand';
import axios from 'axios';
import { Crypto } from '../interfaces/crypto';

interface CryptoState {
  cryptos: Crypto[];
  loading: boolean;
  fetchCryptos: () => Promise<void>;
}

export const useCryptoStore = create<CryptoState>((set) => ({
  cryptos: [],
  loading: false,
  fetchCryptos: async () => {
    set({ loading: true });

    try {
      // 尝试从 localStorage 获取缓存数据
      const cachedData = localStorage.getItem('cryptos');
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        set({ cryptos: parsedData, loading: false });
        return; // 如果找到缓存数据，直接返回
      }

      // 如果没有缓存数据，调用 API 获取数据
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 20,
            page: 1,
          },
        }
      );

      // 保存到 Zustand store 和 localStorage
      set({ cryptos: response.data, loading: false });
      localStorage.setItem('cryptos', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      set({ loading: false });
    }
  },
}));
