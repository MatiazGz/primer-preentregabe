const pathHandler = (req, res, next) => {
  console.error(`${req.method} ${req.url} not found path`);
  return res.json({
    status: 404,
    message: `${req.method} ${req.url} not found path`,
  });
};

export default pathHandler;