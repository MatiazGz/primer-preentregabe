import CustomError from "./errors/CustomError.js";
import errors from "./errors/errors.js";

function isValidPassUtils(formPassword, dbPassword) {
  if (formPassword !== dbPassword) {
    CustomError.new(errors.auth)
  }
}

export default isValidPassUtils;
