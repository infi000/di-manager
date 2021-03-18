const filterNull = (params) => {
  Object.keys(params).forEach((key) => {
    if (params[key] === '' || params[key] === null || params[key] === undefined) delete params[key];
  });
  return params;
};

export default filterNull;
