
export const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    
    try {
      const verified = DecodeToken(token);
      req.user = verified;
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid token' });
    }
  };