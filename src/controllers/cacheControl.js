module.exports = (request, response, next) => {
  response.set('Cache-Control', 'public, max-age=0, no-cache, no-store');
  next();
};