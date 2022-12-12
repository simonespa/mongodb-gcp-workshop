import fs from 'fs';
import util from 'util';
import { GridFSBucket } from 'mongodb';

const DATABASE = process.env.MONGODB_DATABASE;
const COLLECTION = process.env.MONGODB_COLLECTION;
const bucketName = 'audio';

const writeFile = util.promisify(fs.writeFile);

export async function findDocumentById(mongodb, documentId) {
  return await mongodb
    .db(DATABASE)
    .collection(COLLECTION)
    .findOne({ _id: documentId });
}

export async function insertDocument(mongodb, document) {
  await mongodb.db(DATABASE).collection(COLLECTION).insertOne(document);
  return document;
}

export async function openUploadStreamWithId(mongodb, id, audio) {
  const db = mongodb.db(DATABASE);
  const bucket = new GridFSBucket(db, { bucketName });
  const filePath = `/tmp/${id}.mp3`;

  await writeFile(filePath, audio, 'binary');

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(bucket.openUploadStreamWithId(id, `${id}.mp3`))
      .on('error', (error) => {
        reject(error);
      })
      .on('finish', () => {
        resolve();
      });
  });
}

export function openDownloadStream(mongodb, id) {
  const db = mongodb.db(DATABASE);
  const bucket = new GridFSBucket(db, {
    chunkSizeBytes: 1024,
    bucketName,
  });

  return bucket.openDownloadStream(id);
}
