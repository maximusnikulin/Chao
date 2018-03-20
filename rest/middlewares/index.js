module.exports.authMiddleware = function(req, res, next) {
  const random = Math.round(Math.random());
  //check session
  if (random) { 
    return res.redirect('/login');
  }
  
  return next();
}