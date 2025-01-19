const express = require('express');
const dotenv = require('dotenv');
const healthRoutes = require('./routes/healthRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', healthRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});