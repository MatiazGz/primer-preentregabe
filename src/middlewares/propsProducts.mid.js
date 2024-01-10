function propsProducts(req, res, next) {
    const { name, place } = req.body;
    if (!name || !place) {
      return res.json({
        satusCode: 400,
        message: `${req.method} ${req.url} nombre y lugar requeridos`,
      });
    } else {
      return next();
    }
  }
  export default propsProducts;
  