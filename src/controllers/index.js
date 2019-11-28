module.exports = (request, response, next) => {
  response.status(200).render('index');
};