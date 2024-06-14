// src/services/stockService.ts
import axios from 'axios';

const API_KEY = 'cpm9pfpr01quf620pk70cpm9pfpr01quf620pk7g'; // Use your API key here
const BASE_URL = 'https://finnhub.io/api/v1/';

export const getStockData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/stock/symbol?exchange=US&token=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
};
