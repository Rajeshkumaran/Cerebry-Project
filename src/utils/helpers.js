export const get = (from, selector, defaultVal) => {
  const value = selector
    .replace(/\[([^[\]]*)\]/g, ".$1.")
    .split(".")
    .filter((t) => t !== "")
    .reduce((prev, cur) => prev && prev[cur], from);
  return value === undefined || value === null ? defaultVal : value;
};
export const mapObjectToArray = (obj) => {
  if (!obj) return [];
  if (typeof obj === "object") {
    return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
  }
};
export const isObject = (object) =>
  typeof object === "object" && object !== null;
export const isFunction = (val) => typeof val === "function";
export const isString = (val) => typeof val === "string";
export const isEmpty = (val) =>
  val == null || !(Object.keys(val) || val).length;
