import { GridFSBucket } from 'mongodb';

export default async function play(request, response, next) {
  try {
    const db = request.app.locals.mongodb.db(process.env.MONGODB_DATABASE);

    const bucket = new GridFSBucket(db, {
      chunkSizeBytes: 1024,
      bucketName: 'fs'
    });

    const { id } = request;

    bucket.openDownloadStream(id).pipe(response);
  } catch (error) {
    response.json({
      error: error.message
    });
  }
}
