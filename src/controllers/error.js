module.exports = (error, request, response, next) => {
  // see https://expressjs.com/en/guide/error-handling.html
  if (response.headersSent) {
    return next(error);
  }

  if (error.message === 'PAGE_NOT_FOUND') {
    response.locals.title = 'Page not found';
    response.locals.content = `Can't find ${request.path}`;
    response.status(404);
  } else {
    response.locals.title = 'Error';
    response.locals.content = error.message;
    response.status(500);
  }

  response.render('other');
};