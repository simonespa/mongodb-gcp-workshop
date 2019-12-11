import { analyzeEntitiesFromText } from './gcp';
import { findDocumentById, insertDocument } from './mongodb';

const crypto = require('crypto');

function normalise(text = '') {
  return crypto
    .createHash('sha256')
    .update(
      text
        .trim()
        .toLowerCase()
        .split(/\s/)
        .join('')
    )
    .digest('hex');
}

export async function getDocument(mongodb, text) {
  const documentId = normalise(text);
  return await findDocumentById(mongodb, documentId);
}

export async function storeDocument(mongodb, text) {
  const documentId = normalise(text);
  const { language, entities } = await analyzeEntitiesFromText(text);
  const document = { _id: documentId, language, entities };
  return await insertDocument(mongodb, document);
}
