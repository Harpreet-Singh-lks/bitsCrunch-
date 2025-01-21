const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
//const morgan = require('morgan');
//const portfolioRoutes = require('./routes/portfolioRoutes');
//const collectionRoutes = require('./routes/collectionRoutes');
//const riskRoutes = require('./routes/riskRoutes');
const fetchdataRoutes = require('./routes/fetchdataRoutes'); // Add this line
// errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS
//app.use(morgan('dev')); // Log HTTP requests

// Routes
//p.use('/api/portfolio', portfolioRoutes);
app.use('/api/fetchdata', fetchdataRoutes); // Add this line
//app.use('/api/collection', collectionRoutes);
//app.use('/api/risk', riskRoutes);

// Error Handling Middleware
//app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});