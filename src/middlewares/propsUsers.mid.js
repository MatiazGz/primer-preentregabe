function propsUsers(req, res, next) {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.json({
        satusCode: 400,
        message: `${req.method} ${req.url} nombre y email requeridos`,
      });
    } else {
      return next();
    }
  }
  export default propsUsers;
  