// src/components/StockList.tsx
import React, { useEffect, useState } from 'react';
import { getStockData } from '../services/stockService';
import { calculateDiversity } from '../utils/calculateDiversity';

interface Stock {
  symbol: string;
  description: string;
}

const StockList: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [portfolio, setPortfolio] = useState<Stock[]>([]);
  const [diversity, setDiversity] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchStocks = async () => {
      const stockData = await getStockData();
      setStocks(stockData);
      setFilteredStocks(stockData);
    };

    fetchStocks();
  }, []);

  const addToPortfolio = (stock: Stock) => {
    console.log("Button clicked", stock);
    const updatedPortfolio = [...portfolio, stock];
    setPortfolio(updatedPortfolio);
    setDiversity(calculateDiversity(updatedPortfolio));
  };

  const removeFromPortfolio = (symbol: string) => {
    const updatedPortfolio = portfolio.filter(stock => stock.symbol !== symbol);
    setPortfolio(updatedPortfolio);
    setDiversity(calculateDiversity(updatedPortfolio));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFilteredStocks(stocks.filter(stock => 
      stock.description.toLowerCase().includes(e.target.value.toLowerCase()) || 
      stock.symbol.toLowerCase().includes(e.target.value.toLowerCase())
    ));
  };

  return (
    <div>
      <h1>Stock List</h1>
      <input
        type="text"
        placeholder="Search stocks..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredStocks.map((stock, index) => (
          <li key={`${stock.symbol}-${index}`}>
            {stock.description} ({stock.symbol})
            <button onClick={() => addToPortfolio(stock)}>Add to Portfolio</button>
          </li>
        ))}
      </ul>
      <h2>Portfolio</h2>
      <ul>
        {portfolio.map((stock, index) => (
          <li key={`${stock.symbol}-${index}`}>
            {stock.description} ({stock.symbol})
            <button onClick={() => removeFromPortfolio(stock.symbol)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Portfolio Diversity: {diversity.toFixed(2)}%</h3>
    </div>
  );
};

export default StockList;
