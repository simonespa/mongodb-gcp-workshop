# London MongoDB Atlas on GCP workshop competition

[![CircleCI](https://circleci.com/gh/simonespa/mongodb-gcp-competition.svg?style=svg)](https://circleci.com/gh/simonespa/mongodb-gcp-competition)

This is an open source proof of concept that integrates [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) with the [Google Cloud Platform APIs](https://cloud.google.com/apis) as part of the [London MongoDB Atlas on GCP workshop](https://mdbgcp.splashthat.com) competition (November 27 2019 - Google London).

The web app is an ExpressJS server which uses the GCP Cloud Natural Language API to detect the language and extract the Wikipedia links of the core entities of the entered text and the Cloud Text-to-Speech API to generate the audio version of it.

For performance reasons the response from both GCP APIs are stored in MongoDB Atlas which works as a caching layer. The ID of each entry is the SHA-256 fingerprint of the normalised version (lower case, stripped of all spaces) of the text itself. This makes sure that the same text is not analysed twice. Also, the web app makes use of a connection pool to communicate with MongoDB.

## The competition

This project was chosen as the winning application. First prize: the Google Stadia controller with 1 month free subscription.

In the words of judge - Jim Blackhurst, Principal Solution Architect

> "I think Simone's work is brilliant, and way beyond what we expected to see. He's really run with the idea and take the prototype in a new direction. The use of the GCP Language API to mine Wikipedia for even greater context really has some exciting implications for a deeper level of metadata tagging. The use of the Text to Speech API, which on the surface might just seem to be a bolt-on idea, actually has a lot of relevance towards providing applications with innovative interfaces, and as such demonstrates how this might feel when used through personal assistants such as Google Home or Amazon Echo.
>
> On top of this, Simone shows all the best practices around the use of MongoDB and JS, CI/CD and Git, which is not something we were really focused on but demonstrates to me the level of thought that has gone into this.
>
> We (the judging panel) have no hesitation in putting Simone's work forward as our winner!
>
> Well done Simone, and Merry Christmas!"

## Pre-requisites

- Have a GCP account
- Have the Cloud Natural Language and the Cloud Text-to-Speech APIs enabled
- Have "Service Account Key" credential generated
- Have a MongoDB Atlas account and a cluster deployed

Note: in development you could also use MongoDB Community Server which can be downloaded from [here](https://www.mongodb.com/download-center/community).

## Getting started

1. Create a "Service Account Key" credential in GCP as described [here](https://github.com/rbohan/MongoDBAtlas-GCP-AIMLv2/blob/master/Guides/GCPProjectAndVisionSetup.md)
2. Download the GCP credential to the root folder of the project, in a file named `gcpcreds.json`. Without doing so, you'll get the following error: `400 undefined: Getting metadata from plugin failed with error: invalid_grant: Robot is disabled.`
3. Export the following environment variables:

- `MONGODB_URI`: the connection URI. If you use Atlas, you can get the URI by clicking the "connect" button of the Sandbox area by clicking on "Clusters" on the left-hand-side menu. If you use the Community server, the URI is `mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb`
- `MONGODB_DATABASE`: the database name
- `MONGODB_COLLECTION`: the collection name

4. Execute `npm install`
5. Execute `npm run watch` in development

To build the app for production, execute `npm run build` and then `npm start` to run it.

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
