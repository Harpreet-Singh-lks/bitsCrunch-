const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const FormData = require('form-data');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' });

// const uri = process.env.MONGODB_URI;
// if (!uri) {
//     throw new Error('MONGODB_URI is not defined in the environment variables');
// }

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));



// Upload Route
const fetch = (await import('node-fetch')).default; // Dynamic import

app.post('/upload', upload.single('file'), async (req, res) => {
  const { walletAddress, name, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Fetch NFTs from the wallet address
    const nftResponse = await fetch(`https://api.blockchain.com/v3/wallet/${walletAddress}/nfts`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer YOUR_BLOCKCHAIN_API_KEY',
      },
    });

    if (!nftResponse.ok) {
      throw new Error('Failed to fetch NFTs from wallet');
    }

    const nfts = await nftResponse.json();

    // Prepare form data
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('nfts', JSON.stringify(nfts));

    // Send data to BitsCrunch API
    const response = await fetch('https://api.unleashnfts.com/api/v1/nft/blockchain/address/token?currency=usd&include_washtrade=true', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 7c4722433ad7e404e741cbfdec13e0d4',
      },
      body: formData,
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));