function propsEvents(req, res, next) {
  const { title, photo } = req.body;
  if (!title || !photo) {
    return res.json({
      satusCode: 400,
      message: `${req.method} ${req.url} nombre y foto requeridos`,
    });
  } else {
    return next();
  }
}
export default propsEvents;
