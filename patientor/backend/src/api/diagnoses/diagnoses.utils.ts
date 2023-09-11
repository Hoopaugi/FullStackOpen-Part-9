import { isString } from "../../utils";

export const parseCode = (code: unknown): string => {
  if (!code || !isString(code)) {
    throw new Error('Incorrect or missing code');
  }

  return code;
};
