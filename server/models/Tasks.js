const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  status: { type: String, default: 'todo' },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' }
});

module.exports = mongoose.model('Task', taskSchema);
