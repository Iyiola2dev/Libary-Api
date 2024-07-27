export const authorizeRole = (requiredRoles) => {
    return (req, res, next) => {
    //   console.log(requiredRoles);
    //   console.log(req.user, "jnj");
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Access denied. No user information found." });
      }
  
      if (!requiredRoles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }
      next();
    };
  };
  

  ///
  export const isStaff = (req, res, next) => {
    if (req.user.role === 'staff' || req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
  
  export const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };