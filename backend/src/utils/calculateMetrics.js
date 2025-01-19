const calculateWashTradingIndex = (washTradeData) => {
    const { washtrade_volume, total_trading_volume } = washTradeData;
  
    if (total_trading_volume === 0) {
      return 0; // Avoid division by zero
    }
  
    const washTradeIndex = (washtrade_volume / total_trading_volume) * 100;
    return washTradeIndex.toFixed(2); // Return the value rounded to 2 decimal places
  };
  
  const calculateWhaleConcentration = (whaleActivityData) => {
    const { holders_whales, total_holders } = whaleActivityData;
  
    if (total_holders === 0) {
      return 0; // Avoid division by zero
    }
  
    const whaleConcentration = (holders_whales / total_holders) * 100;
    return whaleConcentration.toFixed(2);
  };
  
  const calculateProfitableTradesPercentage = (tradeData) => {
    const { profitable_trades, total_trades } = tradeData;
  
    if (total_trades === 0) {
      return 0; // Avoid division by zero
    }
  
    const profitableTradesPercentage = (profitable_trades / total_trades) * 100;
    return profitableTradesPercentage.toFixed(2); // Return the result rounded to 2 decimal places
  };
  
  const calculateLiquidityScore = (collectionData) => {
    const { sales, volume } = collectionData;
  
    if (volume === 0) {
      return 0; // Avoid division by zero
    }
  
    const liquidityScore = (sales / volume) * 100;
    return liquidityScore.toFixed(2); // Return the result rounded to 2 decimal places
  };
  
  const calculateMarketDominance = (collectionData) => {
    const { collection_volume, total_market_volume } = collectionData;
  
    if (total_market_volume === 0) {
      return 0; // Avoid division by zero
    }
  
    const marketDominance = (collection_volume / total_market_volume) * 100;
    return marketDominance.toFixed(2); // Return the result rounded to 2 decimal places
  };
  
  const calculateSentimentIndex = (sentimentData) => {
    const { positive_mentions, total_mentions } = sentimentData;
  
    if (total_mentions === 0) {
      return 50; // Neutral sentiment if no data is available
    }
  
    const sentimentIndex = (positive_mentions / total_mentions) * 100;
    return sentimentIndex.toFixed(2); // Return the result rounded to 2 decimal places
  };
  
  const calculateDiamondHandsScore = (diamondHandsData) => {
    const { holders_diamond_hands, total_holders } = diamondHandsData;
  
    if (total_holders === 0) {
      return 0; // Avoid division by zero
    }
  
    const diamondHandsScore = (holders_diamond_hands / total_holders) * 100;
    return diamondHandsScore.toFixed(2); // Return the result rounded to 2 decimal places
  };
  
  const calculateHealthScore = (washTradingIndex, whaleConcentration, profitableTradesPercentage, liquidityScore, marketDominance) => {
    const totalScore =
      washTradingIndex +
      whaleConcentration +
      profitableTradesPercentage +
      liquidityScore +
      marketDominance;
  
    const healthScore = totalScore / 5; // Average of all metrics
    return healthScore.toFixed(2); // Return the result rounded to 2 decimal places
  };
  
  module.exports = {
    calculateWashTradingIndex,
    calculateWhaleConcentration,
    calculateProfitableTradesPercentage,
    calculateLiquidityScore,
    calculateMarketDominance,
    calculateHealthScore,
    calculateSentimentIndex,
    calculateDiamondHandsScore,
  };