export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isNumber = (num: unknown): num is number => {
  return typeof num === 'number';
};

export const isObject = (object: unknown): object is object => {
  return typeof object === 'object';
};

export const isObjectArray = (array: unknown): array is Array<object> => {
  return Array.isArray(array);
};

export const isStringArray = (array: unknown): array is Array<string> => {
  return Array.isArray(array);
};

export const hasProp = <K extends PropertyKey>(object: object, prop: K): object is Record<K, unknown> => {
  return prop in object;
};

export const getProp = (object: object, prop: string, optional?: boolean) => {
  if (!hasProp(object, prop)) {
    if(!optional) {
      throw new Error(`Missing property ${prop}`);
    }

    return undefined;
  }

  const field = object[prop];

  return field;
};

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
