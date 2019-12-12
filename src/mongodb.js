import { GridFSBucket } from "mongodb";

const DATABASE = process.env.MONGODB_DATABASE;
const COLLECTION = process.env.MONGODB_COLLECTION;

export async function findDocumentById(mongodb, documentId) {
  return await mongodb
    .db(DATABASE)
    .collection(COLLECTION)
    .findOne({ _id: documentId });
}

export async function insertDocument(mongodb, document) {
  await mongodb
    .db(DATABASE)
    .collection(COLLECTION)
    .insertOne(document);
  return document;
}

export async function uploadAudio(mongodb, id) {
  const db = mongodb.db(DATABASE);
  const bucket = new GridFSBucket(db);
  const filePath = `/tmp/${id}.mp3`;

  fs.createReadStream(filePath).pipe(bucket.openUploadStreamWithId(id, `${id}.mp3`))
    .on('error', (error) => {
      throw error;
    });
}
