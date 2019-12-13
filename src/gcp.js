import { LanguageServiceClient } from '@google-cloud/language';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const type = 'PLAIN_TEXT';

/**
 * Analyze the text detecting the language and entities with a Wikipedia entry.
 *
 * @param {string} content the text to analyze
 * @returns {object}
 */
export async function analyzeEntities(content) {
  // Creates a client
  const client = new LanguageServiceClient();

  // Prepares a document, representing the provided text
  const document = { content, type };

  // Detects entities in the document
  const [result] = await client.analyzeEntities({ document });

  // Gets the detected language and entities
  const { language, entities } = result;

  // Filters the entity collecting only the ones with a Wikipedia URL,
  // and then maps those information in a new object
  const wikipediaEntities = entities
    .filter((entity) =>
      entity.metadata.wikipedia_url ? entity.metadata.wikipedia_url : null
    )
    .map((entity) => ({
      name: entity.name,
      url: entity.metadata.wikipedia_url
    }));

  return { language, entities: wikipediaEntities };
}

export async function synthesizeSpeech(id, text, languageCode) {
  // Creates a client
  const client = new TextToSpeechClient();

  // Construct the request
  const request = {
    input: { text },
    // Select the language and SSML Voice Gender (optional)
    voice: { languageCode, ssmlGender: 'NEUTRAL' },
    // Select the type of audio encoding
    audioConfig: { audioEncoding: 'MP3' }
  };

  // Performs the Text-to-Speech request
  const [response] = await client.synthesizeSpeech(request);

  return response.audioContent;
}
