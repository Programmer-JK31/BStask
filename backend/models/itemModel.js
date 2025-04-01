const mongoose = require('mongoose');

// Contains strorage specific configurations

const itemSchema = new mongoose.Schema({
    value: {
      type: Number,
      required: true,
      default: 0,
    }
});

module.exports = mongoose.model('Item', itemSchema);