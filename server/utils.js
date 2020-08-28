export const getParams = (url) => {
  if (!url) return {};
  const [chunk, params = ""] = url.split("?") || [];
  if (!params) return {};

  let args = {};
  params.split("&").map((item) => {
    let [key, value] = item.split("=");
    args = { ...args, [key.toUpperCase()]: parseInt(value, 10) };
    return null;
  });

  return args;
};
