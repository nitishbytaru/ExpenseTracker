// middleware/auth.middleware.js
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send("You have to Login in to access the page");
}

export { isAuthenticated };
