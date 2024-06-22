import CustomError from "./errors/CustomError.js";
import errors from "./errors/errors.js";

function has8char(password) {
    if (password.length < 8) {
      CustomError.new(errors.message("the password must contain at least 8 characters"))
    }
  }
  
  export default has8char;