const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGODB_URI;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

const databaseName = 'sample_mflix';
const collectionName = 'movies';

(async () => {
  let client;

  try {
    client = await MongoClient.connect(uri, options);
    const collection = await client.db(databaseName).collection(collectionName);
    const results = await collection.find({}, { limit: 10, sort: ['title']}).toArray();
    const titles = results.map((movie) => {
      return movie.title || '';
    });
    console.log(titles);
  } catch (error) {
    console.log(error.message);
  } finally {
    if (client) {
      client.close();
    }
  }
})();