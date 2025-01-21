const axios = require('axios');
require('dotenv').config();
console.log(process.env.API_KEY);
const fetchdata = async (walletAddress) => {
  const options = {
    method: 'GET',
    url: 'https://api.unleashnfts.com/api/v2/nft/wallet/analytics',
    params: {
      wallet: walletAddress,
      blockchain: 'ethereum',
      time_range: 'all',
      sort_by: 'volume',
      sort_order: 'desc',
      offset: 0,
      limit: 30
    },
    headers: {
      accept: 'application/json',
      'x-api-key': process.env.API_KEY
    }
  };

  try {
    const response = await axios.request(options);
    console.log('API Response:', response.data); // Log the entire response

    const data = response.data.data[0];
    if (data === undefined) {
      console.error('Data is undefined. Full response:', response.data);
      throw new Error('Data is undefined');
    }

    const result = {
      nft_sold: data.nft_sold,
      nft_mint: data.nft_mint,
      volume: data.volume,
      nft_transfer: data.nft_transfer,
      nft_bought: data.nft_bought
    };

    return result;
  } catch (error) {
    throw new Error(`Error fetching portfolio data: ${error.message}`);
  }
};

const waletscores = async (walletAddress) => {
  const options = {
    method: 'GET',
    url: 'https://api.unleashnfts.com/api/v2/nft/wallet/scores',
    params: {
      wallet: walletAddress,
      blockchain: 'ethereum',
      sort_by: 'portfolio_value',
      sort_order: 'desc',
      time_range: 'all',
      offset: 0,
      limit: 30
    },
    headers: {
      accept: 'application/json',
      'x-api-key': process.env.API_KEY
    }
  };
  console.log('API Key:', process.env.API_KEY);
  try {
    const response = await axios.request(options);
    console.log('API Response:', response.data); // Log the entire response

    const data = response.data.data[0];
    if (!data) {
      console.error('Data is undefined. Full response:', response.data);
      throw new Error('Data is undefined');
    }

    const result = {
      portfolio_value: data.portfolio_value,
      estimated_portfolio_value: data.estimated_portfolio_value,
      nft_count: data.nft_count,
      realised_profit: data.realised_profit,
      unrealised_profit: data.unrealised_profit
    };

    return result;
  } catch (error) {
    throw new Error(`Error fetching wallet scores: ${error.message}`);
  }
};
console.log(waletscores("0xb8B67E59BF1caf5120605b6b62c7FC0332B9A7c5"))

module.exports = {
  fetchdata,
  waletscores
};