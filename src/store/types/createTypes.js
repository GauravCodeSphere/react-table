
const GLOBAL_CACHE = new Set();

export const createTypes = (...types) => {
  if (types.length === 0) {
    throw new Error("Must specify at least one type");
  }

  const TYPES = {};

  types.forEach((type) => {
    if (GLOBAL_CACHE.has(type)) {
      throw new Error(`${type} has already been defined as an action type`);
    }

    if (typeof type !== "string") {
      throw new Error(`${type} is of an invalid type, expected string`);
    }

    TYPES[type] = type;
    GLOBAL_CACHE.add(type);
  });


  return TYPES;
};


export const clearGlobalCache = () => GLOBAL_CACHE.clear();
