const express = require('express');
const { fetchdata, waletscores } = require('../sevices'); // Adjust the path if necessary
const router = express.Router();

router.get('/analytics/:walletAddress', async (req, res) => {
    const { walletAddress } = req.params;
    try {
        const data = await fetchdata(walletAddress);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/scores/:walletAddress', async (req, res) => {
    const { walletAddress } = req.params;
    try {
        const data = await waletscores(walletAddress);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;