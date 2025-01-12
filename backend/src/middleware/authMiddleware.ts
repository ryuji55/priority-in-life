export const authMiddleware = (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "UN_AUTHORIZED" });
  }
  next();
};
