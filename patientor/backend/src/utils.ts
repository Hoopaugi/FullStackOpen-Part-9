export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isObject = (object: unknown): object is object => {
  return typeof object === 'object';
};

export const hasProp = <K extends PropertyKey>(object: object, prop: K): object is Record<K, unknown> => {
  return prop in object;
};

// FIXME: only supports string properties
export const getProp = (object: object, prop: string): string => {
  if (!hasProp(object, prop)) {
    throw new Error(`Missing property ${prop}`);
  }

  const field = object[prop];

  if (!isString(field)) {
    throw new Error(`Invalid prop ${prop} value ${field}`);
  }

  return field;
};
