const { fetchDataFromAPIs, calculateMetrics } = require('../services/healthServices');

const analyzeAndClusterData = async (req, res) => {
  const { collectionId } = req.params;

  try {
    // Step 1: Fetch data from all APIs
    const [
      collectionData,
      washTradeData,
      whaleActivityData,
      priceData,
      sentimentData,
      diamondHandsData,
    ] = await fetchDataFromAPIs(collectionId);

    // Step 2: Calculate metrics
    const clusteredData = calculateMetrics(collectionData, washTradeData, whaleActivityData, priceData, sentimentData, diamondHandsData);

    // Step 3: Return the clustered data
    res.status(200).json({
      success: true,
      data: clusteredData,
    });
  } catch (error) {
    console.error("Error clustering data:", error);
    res.status(500).json({ success: false, message: "An error occurred", error: error.message });
  }
};

module.exports = { analyzeAndClusterData };