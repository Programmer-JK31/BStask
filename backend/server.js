require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const ItemService = require('./application/services/ItemServices');
const ItemRepo = require('./Infrastructure/ItemRepo');
const ScrollSpeedAdapter = require('./Infrastructure/api/PaginationStrategy/ScrollSpeedtoChunkSize');
const ScrollDirection = require('./Infrastructure/api/PaginationStrategy/ScrollDirection');
const itemController = require('./Infrastructure/api/controllers/ItemController');

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Dependency initialization
const itemRepo = new ItemRepo();
const paginationStrategy = new ScrollSpeedAdapter();
const paginationDirection = new ScrollDirection();
const itemService = new ItemService(itemRepo, paginationStrategy, paginationDirection);

// Express setup
const app = express();
app.use(express.json());

// Routes
const controller = itemController(itemService);
app.get('/items', controller.getItems);
app.post('/items/counts', controller.updateCounts);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});