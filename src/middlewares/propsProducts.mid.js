function propsProducts(req, res, next) {
    const { title, place } = req.body;
    if (!title || !place) {
      return res.json({
        satusCode: 400,
        message: `${req.method} ${req.url} nombre y lugar requeridos`,
      });
    } else {
      return next();
    }
  }
  export default propsProducts;
  