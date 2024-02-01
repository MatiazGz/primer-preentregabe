function notFoundOne(one) {
  if (!one) {
    const error = new Error("There isn't any product");
    error.statusCode = 404;
    throw error;
  }
  return one;
}

export default notFoundOne;
