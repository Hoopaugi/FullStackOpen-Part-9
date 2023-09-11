import { isString } from "../../utils";

export const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing code');
  }

  return id;
};
