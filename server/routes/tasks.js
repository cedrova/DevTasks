const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.get('/:boardId', auth, async (req, res) => {
  const tasks = await Task.find({ board: req.params.boardId });
  res.json(tasks);
});

router.post('/:boardId', auth, async (req, res) => {
  const task = await Task.create({ ...req.body, board: req.params.boardId });
  res.json(task);
});

router.put('/:taskId', auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
  res.json(task);
});

router.delete('/:taskId', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.taskId);
  res.sendStatus(204);
});

module.exports = router;
