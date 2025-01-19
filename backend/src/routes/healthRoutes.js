const express = require('express');
const { analyzeAndClusterData } = require('../controllers/healthController');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

// Route to analyze NFT collection
router.get('/analyze/:collectionId', validateRequest, analyzeAndClusterData);

module.exports = router;