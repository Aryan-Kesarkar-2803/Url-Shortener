import express from "express";
import connectMongoDB from "./connection.js";
import { nanoid } from "nanoid";
import bodyParser from "body-parser";
import URL from "./model/index.js";
const app = express();
const port = process.env.port || 8000;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

connectMongoDB("mongodb://localhost:27017/url-shortner")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(`Error in Connection - ${err}`);
  });

app.post("/api/geturl", async (req, res) => {
  if (!req.body) {
    console.log("Url required");
    res.send("");
  } else {
    //  checking url exist in database or not
    req.body.url = `https://${req.body.url}`;
    const body = await URL.find({ url: req.body.url });
    if (body[0] != undefined) {
      res.send(`http://localhost:${port}/${body[0].shortUrl}`);
    } else {
      //  creating shortUrl if not exist
      const shortenUrl = nanoid(8);

      await URL.create({
        url: req.body.url,
        shortUrl: shortenUrl,
      });
      res.send(`http://localhost:${port}/${shortenUrl}`);
    }
  }
});

app.get("/:shorturl", async (req, res) => {
  const shorturl = req.params.shorturl;
  let data = await URL.find({ shortUrl: shorturl });
  if (!data) {
    res.send();
  }
  res.redirect(data[0].url);
});
