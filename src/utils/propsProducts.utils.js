function propsProductsUtils(data) {
    const { name, photo } = data;
    if (!name || !photo) {
      const error = new Error("nombre y foto requeridos");
      error.statusCode = 404;
      throw error;
    }
  }
  
  export default propsProductsUtils;