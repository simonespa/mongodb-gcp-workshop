import crypto from 'crypto';
import { analyzeEntitiesFromText } from './gcp';
import { findDocumentById, insertDocument } from './mongodb';

export function getId(text) {
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

export async function getDocumentFromCache(mongodb, id) {
  return await findDocumentById(mongodb, id);
}

export async function storeDocumentToCache(mongodb, id, text) {
  const { language, entities } = await analyzeEntitiesFromText(text);
  const document = { _id: id, language, entities };
  return await insertDocument(mongodb, document);
}

export async function storeAudioToCache(mongodb, id, audio) {
  // Creates a client
  const client = new TextToSpeechClient();

  // Construct the request
  const gcpRequest = {
    input: { text },
    // Select the language and SSML Voice Gender (optional)
    voice: { languageCode: 'en', ssmlGender: 'NEUTRAL' },
    // Select the type of audio encoding
    audioConfig: { audioEncoding: 'MP3' }
  };

  // Performs the Text-to-Speech request
  const [gcpResponse] = await client.synthesizeSpeech(gcpRequest);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(
    `/tmp/${document['_id']}.mp3`,
    gcpResponse.audioContent,
    'binary'
  );
}
