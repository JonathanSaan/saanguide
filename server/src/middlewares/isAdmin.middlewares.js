const adminMiddleware = (req, res, next) => {
  if (req.isAdmin) {
    return next();
  }

  res.status(403).json({ message: "Access allowed only for administrators." });
};

export default adminMiddleware;