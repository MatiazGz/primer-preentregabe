function propsProductsUtils(data) {
    const { title, photo } = data;
    if (!title || !photo) {
      const error = new Error("nombre y foto requeridos");
      error.statusCode = 404;
      throw error;
    }
  }
  
  export default propsProductsUtils;