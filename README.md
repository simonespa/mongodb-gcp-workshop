# London MongoDB Atlas on GCP workshop competition

November 27 2019 - Google London - https://mdbgcp.splashthat.com/

This project runs Express server which integrates with "mongodb" and "gcp" NPM libraries. It uses the Cloud Natural Language API to return Wikipedia links of the entities extracted from the text entered by the user. The response is then stored in MongoDB Atlas which works as a caching layer. The ID of each entry is the SHA 256 fingerprint of the normalised version of the text itself (lower case, stripped of all spaces).

## Pre-requisites

- Have a GCP account
- Have the GCP Cloud Natural Language API enabled
- Have "Service Account Key" credential generated
- Have a MongoDB Atlas account and a cluster deployed

## Getting started

1. Create a "Service Account Key" credential in GCP as described [here](https://github.com/rbohan/MongoDBAtlas-GCP-AIMLv2/blob/master/Guides/GCPProjectAndVisionSetup.md)
2. Download the GCP credential to the root folder of the project, in a file named `gcpcreds.json`. Without doing so, you'll get the following error: `400 undefined: Getting metadata from plugin failed with error: invalid_grant: Robot is disabled.`
3. Export the following environment variables:

- `MONGODB_DATABASE`: the database name
- `MONGODB_COLLECTION`: the collection name
- `MONGODB_URI`: the connection URI that you can get from your MongoDB Atlas account.

4. Execute `npm install`
5. Execute `npm watch` for development or `npm start` for production

## Development

CI: https://circleci.com/gh/simonespa/mongodb-gcp-competition

## References

- https://github.com/rbohan/MongoDBAtlas-GCP-AIMLv2
- https://github.com/mongodb/node-mongodb-native
- http://mongodb.github.io/node-mongodb-native/3.1/api
- https://docs.mongodb.com
- https://github.com/googleapis/nodejs-language
- https://cloud.mongodb.com
- https://cloud.google.com/nodejs/docs/reference/libraries
- https://cloud.google.com/natural-language/
- https://cloud.google.com/natural-language/docs/reference/rest/?apix=true
- https://googleapis.dev/nodejs/language/latest/index.html
