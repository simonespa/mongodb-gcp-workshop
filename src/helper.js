const { analyzeEntitiesFromText } = require('./gcp');
const { findDocumentById, insertDocument } = require('./mongodb');

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

async function getDocument(mongodb, text) {
  const documentId = normalise(text);
  return await findDocumentById(mongodb, documentId);
}

async function storeDocument(mongodb, text) {
  const documentId = normalise(text);
  const { language, entities } = await analyzeEntitiesFromText(text);
  const document = { _id: documentId, language, entities };
  return await insertDocument(mongodb, document);
}

module.exports = { getDocument, storeDocument };
