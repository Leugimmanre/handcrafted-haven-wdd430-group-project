import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/products", "/orders/:path*", "/admin/:path*"],
};

export const corsMiddleware = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Preflight request
    res.status(200).end();
    return;
  }

  return await handler(req, res);
};