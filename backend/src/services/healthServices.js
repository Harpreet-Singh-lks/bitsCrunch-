const { fetchCollectionProfile } = require('../apis/collectionProfile');
const { fetchWashTradeData } = require('../apis/washTrade');
const { fetchWhaleActivity } = require('../apis/whaleActivity');
const { fetchPriceEstimation } = require('../apis/priceEstimation');
const { fetchSentimentAnalysis } = require('../apis/sentimentAnalysis');
const { fetchDiamondHandsMetrics } = require('../apis/diamondHands');
const {
  calculateWashTradingIndex,
  calculateWhaleConcentration,
  calculateProfitableTradesPercentage,
  calculateLiquidityScore,
  calculateMarketDominance,
  calculateHealthScore,
  calculateSentimentIndex,
  calculateDiamondHandsScore,
} = require('../utils/calculateMetrics');

const fetchDataFromAPIs = async (collectionId) => {
  return await Promise.all([
    fetchCollectionProfile(collectionId),
    fetchWashTradeData(collectionId),
    fetchWhaleActivity(collectionId),
    fetchPriceEstimation(collectionId),
    fetchSentimentAnalysis(collectionId),
    fetchDiamondHandsMetrics(collectionId),
  ]);
};

const calculateMetrics = (collectionData, washTradeData, whaleActivityData, priceData, sentimentData, diamondHandsData) => {
  const washTradingIndex = calculateWashTradingIndex(washTradeData);
  const whaleConcentration = calculateWhaleConcentration(whaleActivityData);
  const profitableTradesPercentage = calculateProfitableTradesPercentage(collectionData);
  const liquidityScore = calculateLiquidityScore(collectionData);
  const marketDominance = calculateMarketDominance(collectionData);
  const sentimentIndex = calculateSentimentIndex(sentimentData);
  const diamondHandsScore = calculateDiamondHandsScore(diamondHandsData);
  const healthScore = calculateHealthScore(
    washTradingIndex,
    whaleConcentration,
    profitableTradesPercentage,
    liquidityScore,
    marketDominance
  );

  return {
    marketMetrics: {
      liquidityScore,
      marketDominance,
      sentimentIndex,
    },
    activityMetrics: {
      whaleConcentration,
      profitableTradesPercentage,
    },
    riskMetrics: {
      washTradingIndex,
      diamondHandsScore,
    },
    overallScore: {
      healthScore,
    },
  };
};

module.exports = { fetchDataFromAPIs, calculateMetrics };