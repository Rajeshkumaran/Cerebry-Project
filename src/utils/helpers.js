export const get = (from, selector, defaultVal) => {
  const value = selector
    .replace(/\[([^[\]]*)\]/g, ".$1.")
    .split(".")
    .filter((t) => t !== "")
    .reduce((prev, cur) => prev && prev[cur], from);
  return value === undefined || value === null ? defaultVal : value;
};

export const checkParamsExist = (args) => {
  const { A, B, C } = args || {};
  // if one of the 2 arguments is missing ,then pythagoras calculation cannot be done
  if (!A) {
    return B && C;
  } else if (!B) {
    return !!C;
  }

  return true;
};
const square = (number) => {
  return number * number;
};
export const computeNewArg = (A, B) => {
  return Math.sqrt(square(A) + square(B));
};
export const isValidPythagorasInputs = ({ A = 0, B = 0, C = 0 }) => {
  A = parseInt(A, 10);
  B = parseInt(B, 10);
  C = parseInt(C, 10);
  let isValid = true;
  let newlyComputed = "";
  if (A && B && C) {
    if (A < B) {
      A = A + B;
      B = A - B;
      A = A - B;
    }
    isValid = square(A) + square(B) === square(C);
    if (!isValid) {
      C = computeNewArg(A, B);
      newlyComputed = "C";
    }
  } else if (A && B) {
    if (A < B) {
      A = A + B;
      B = A - B;
      A = A - B;
    }
    isValid = square(A) + square(B) === square(C);
    if (!isValid) {
      C = computeNewArg(A, B);
      newlyComputed = "C";
    }
  } else if ((A && C) || (B && C)) {
    if (!A) {
      A = Math.sqrt(square(C) - square(B));
      newlyComputed = "A";
    }
    if (!B) {
      B = Math.sqrt(square(C) - square(A));
      newlyComputed = "B";
    }
    isValid = false;
  }

  return {
    isValid,
    newlyComputed,
    args: {
      A,
      B,
      C,
    },
  };
};
