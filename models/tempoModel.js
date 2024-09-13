const mongoose = require('mongoose');

const TempoSchema = new mongoose.Schema({
  cidade: {
    type: String,
    required: true,
  },
  dados: {
    type: Object,
    required: true,
  },
  dataConsulta: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Tempo', TempoSchema);
