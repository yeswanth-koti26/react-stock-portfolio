// src/utils/calculateDiversity.ts
interface Stock {
    symbol: string;
    description: string;
  }
  
  export const calculateDiversity = (portfolio: Stock[]): number => {
    // Assume a fixed value for stock prices and sectors for simplicity
    const sectors = ['Technology', 'Healthcare', 'Finance']; // Example sectors
    const sectorWeights: { [key: string]: number } = {};
  
    portfolio.forEach(stock => {
      const sector = sectors[Math.floor(Math.random() * sectors.length)];
      if (!sectorWeights[sector]) {
        sectorWeights[sector] = 0;
      }
      sectorWeights[sector] += 1 / portfolio.length;
    });
  
    let diversityScore = 0;
    for (const sector in sectorWeights) {
      diversityScore += sectorWeights[sector] ** 2;
    }
  
    return (1 - diversityScore) * 100;
  };
  