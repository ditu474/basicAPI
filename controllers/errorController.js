const errorController = (err, _, res) => {
  res.status(500).json({ error: err });
};

module.exports = errorController;
