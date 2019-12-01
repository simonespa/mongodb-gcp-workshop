const express = require("express");
const exphbs = require("express-handlebars");
const MongoClient = require("mongodb").MongoClient;
const cacheControl = require("./controllers/cacheControl");
const index = require("./controllers/index");
const submitText = require("./controllers/submitText");
const notFound = require("./controllers/notFound");
const error = require("./controllers/error");

const app = express();
const port = 8088;

// Hides the header that exposes Express as a server
app.disable("x-powered-by");

// Setup the engine using express handlebars
app.engine(
  "hbs",
  exphbs({
    extname: "hbs"
  })
);
app.set("view engine", "hbs");
// To disable the use of layouts. See https://github.com/ericf/express-handlebars#layouts.
app.locals.layout = false;

app.set("views", "src/views");
app.use("/assets", express.static("assets"));

app.use(express.urlencoded());

app.use(cacheControl);

app.get("/", index);
app.post("/", submitText);
app.get("*", notFound);

app.use(error);

app.listen(port, async (error) => {
  if (error) {
    return console.error(error.message);
  }

  try {
    app.locals.mongodb = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.info(`Listening on port ${port}`);
  } catch (e) {
    return console.error(e.message);
  }
});
