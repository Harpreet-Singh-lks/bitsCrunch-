const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
//const fetch = require('node-fetch'); // Ensure you have node-fetch installed

const app = express();
const upload = multer();

app.use(express.json());

app.get('/home', async (req, res) => {
  console.log("Welcome to unleash NFTs");
  try {
    res.json({ message: "Welcome to unleash NFTs" });
  } catch (error) {
    console.error('Error fetching home data:', error);
    res.status(500).json({ error: 'Error fetching home data' });
  }
});

// app.post('/upload', upload.single('file'), async (req, res) => {
//   const { walletAddress, name, description } = req.body;
//   const file = req.file;

//   if (!file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   try {
//     // Fetch NFTs from the wallet address using axios
//     const options = {
//       method: 'GET',
//       url: `https://api.unleashnfts.com/api/v1/wallet/${walletAddress}/nfts?currency=usd&sort_by=holders&sort_order=desc&offset=0&limit=30&time_range=24h`,
//       headers: { accept: 'application/json', 'x-api-key': '7c4722433ad7e404e741cbfdec13e0d4' }
//     };

//     const nftResponse = await axios.request(options);
//     const nfts = nftResponse.data;

//     // Prepare form data
//     const formData = new FormData();
//     formData.append('file', file.buffer, file.originalname);
//     formData.append('name', name);
//     formData.append('description', description);
//     formData.append('walletAddress', walletAddress);
//     formData.append('nfts', JSON.stringify(nfts));

//     // Send data to BitsCrunch API
//     const response = await fetch('https://api.unleashnfts.com/api/v1/nft/blockchain/address/token?currency=usd&include_washtrade=true', {
//       method: 'POST',
//       headers: {
//         'Authorization': 'Bearer 7c4722433ad7e404e741cbfdec13e0d4',
//       },
//       body: formData,
//     });

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).json({ error: 'Error uploading file' });
//   }
// });

app.get('/nfts/:walletAddress', async (req, res) => {
  const { walletAddress } = req.params;

  try {
    // Fetch NFTs from the wallet address using fetch
    const url = `https://api.unleashnfts.com/api/v1/wallet/${walletAddress}/nfts?currency=usd&sort_by=holders&sort_order=desc&offset=0&limit=30&time_range=24h`;
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-api-key': '7c4722433ad7e404e741cbfdec13e0d4' }
    };

    // Dynamically import node-fetch
    const fetch = (await import('node-fetch')).default;

    const response = await fetch(url, options);
    const nfts = await response.json();
    res.json(nfts);
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    res.status(500).json({ error: 'Error fetching NFTs' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});