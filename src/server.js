import express from 'express';
import exphbs from 'express-handlebars';
import { MongoClient } from 'mongodb';
import cacheControl from './controllers/cacheControl';
import index from './controllers/index';
import submitText from './controllers/submitText';
import notFound from './controllers/notFound';
import error from './controllers/error';

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

app.use(express.urlencoded({ extended: true }));

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
