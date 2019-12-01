const { getDocument, storeDocument } = require('../helper');

module.exports = async (request, response, next) => {
  const { text } = request.body;

  try {
    let document = await getDocument(request.app.locals.mongodb, text);

    if (!document) {
      document = await storeDocument(request.app.locals.mongodb, text);
    }

    response.locals.text = text;
    response.locals.language = document.language;
    response.locals.entities = document.entities;
    response.status(200).render('index');
  } catch (error) {
    next(error);
  }
};
