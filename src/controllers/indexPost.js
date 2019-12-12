import { getDocumentFromCache, storeDocumentToCache } from '../helper';

export default async function indexPost(request, response, next) {
  const { text } = request.body;

  try {
    const id = getId(text);
    let document = await getDocumentFromCache(request.app.locals.mongodb, id);

    if (!document) {
      document = await storeDocumentToCache(request.app.locals.mongodb, id, text);
    }

    response.locals.text = text;
    response.locals.textId = id;
    response.locals.language = document.language;
    response.locals.entities = document.entities;
    response.status(200).render('index');
  } catch (error) {
    next(error);
  }
}
