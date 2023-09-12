import { Request, Response } from "express";

const ping = (_req: Request, res: Response) => {
  res.send('pong');
};

export default { ping };
