import languageApi from '@google-cloud/language';

const type = 'PLAIN_TEXT';

/**
 * Analyze the text detecting the language and entities with a Wikipedia entry.
 *
 * @param {string} content the text to analyze
 * @returns {object}
 */
export async function analyzeEntitiesFromText(content) {
  // Creates a client
  const client = new languageApi.LanguageServiceClient();

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
