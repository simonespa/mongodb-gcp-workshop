import crypto from 'crypto';
import { analyzeEntities, synthesizeSpeech } from './gcp';
import {
  findDocumentById,
  insertDocument,
  openUploadStreamWithId,
  openDownloadStream,
} from './mongodb';

export function getId(text) {
  return crypto
    .createHash('sha256')
    .update(text.trim().toLowerCase().split(/\s/).join(''))
    .digest('hex');
}

export async function getDocumentFromCache(mongodb, id) {
  return await findDocumentById(mongodb, id);
}

export async function storeDocumentToCache(mongodb, id, text) {
  const { language, entities } = await analyzeEntities(text);
  const document = { _id: id, language, entities, text };
  return await insertDocument(mongodb, document);
}

export async function generateAndStoreAudioToCache(mongodb, document) {
  const { _id: id, language, text } = document;
  const audio = await synthesizeSpeech(id, text, language);
  await openUploadStreamWithId(mongodb, id, audio);
}

export function openAudioStream(mongodb, id) {
  return openDownloadStream(mongodb, id);
}
