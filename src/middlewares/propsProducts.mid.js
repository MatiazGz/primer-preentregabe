import propsProductsUtils from "../utils/propsProducts.utils.js";

export default (req, res, next) => {
  try {
    propsProductsUtils(req.body);
    return next();
  } catch (error) {
    return next(error);
  }
};
