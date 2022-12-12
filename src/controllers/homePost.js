import {
  getId,
  getDocumentFromCache,
  storeDocumentToCache,
  generateAndStoreAudioToCache,
} from '../helper';

export default async function homePost(request, response, next) {
  const { text } = request.body;
  const { mongodb } = request.app.locals;

  try {
    const id = getId(text);
    let document = await getDocumentFromCache(mongodb, id);

    if (!document) {
      document = await storeDocumentToCache(mongodb, id, text);
      await generateAndStoreAudioToCache(mongodb, document);
    }

    response.locals.text = text;
    response.locals.textId = id;
    response.locals.language = document.language;
    response.locals.entities = document.entities;
    response.status(200).render('home');
  } catch (error) {
    next(error);
  }
}
