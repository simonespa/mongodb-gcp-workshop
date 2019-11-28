const { analyzeEntitiesFromText } = require('../gcp');

module.exports = async (request, response, next) => {
  const { text } = request.body;
  
  try {
    const { language, entities } = await analyzeEntitiesFromText(text);
    response.locals.text = text;
    response.locals.language = language;
    response.locals.entities = entities;
    response.status(200).render('index');
  } catch (error) {
    next(error);
  }
};