const router = require('express').Router();
const Board = require('../models/Board');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const boards = await Board.find({ user: req.user.id });
  res.json(boards);
});

router.post('/', auth, async (req, res) => {
  const board = await Board.create({ name: req.body.name, user: req.user.id });
  res.json(board);
});

module.exports = router;
