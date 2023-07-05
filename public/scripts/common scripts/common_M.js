function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

/**
 * Returns the type of the object passed only if it's a primitive
 * @param {*} given_obj Any given object
 * @returns {String}
 */
function getInputType(given_obj) {
  switch (typeof given_obj) {
    case "number":
      return Number;
      break;
    case "string":
      return String;
      break;
    case "function":
      return Function;
      break;
    case "object":
      return Object;
      break;
    default:
      return false;
      break;
  }
}

/**
 *
 * @param {*} given_obj any given object
 * @param {String} expectedType any given expected type, equates to the
 *                              return value of the type of operator
 * @returns {Boolean}
 */
function checkInput(given_obj, expectedType) {
  return typeof given_obj === expectedType ? true : false;
}

export { roundToTwo, getInputType, checkInput };
