const DATABASE = process.env.MONGODB_DATABASE;
const COLLECTION = process.env.MONGODB_COLLECTION;

async function findDocumentById(mongodb, documentId) {
  return await mongodb.db(DATABASE).collection(COLLECTION).findOne({_id: documentId});
}

async function insertDocument(mongodb, document) {
  await mongodb.db(DATABASE).collection(COLLECTION).insertOne(document);
  return document
}

module.exports = { findDocumentById, insertDocument };
