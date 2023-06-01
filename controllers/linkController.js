const {
  getMetaThumb,
  getScrapedThumb,
  getMetaTitle,
  getScrapedTitle,
  getFavicon,
} = require("../helpers/linkHelper");
const LinkModel = require("../models/LinkModel");
const puppeteer = require("puppeteer");

const fetchLinks = async (req, res) => {
  const links = await LinkModel.find({});
  res.json(links).status(200);
};

const postLinks = async (req, res) => {
  const { data } = req.body;
  var responseData = [];
  console.log("array created");
  let arr = JSON.parse(data);
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    for (let i = 0; i < arr.length; i++) {
      global.socket.emit(
        "linkProcessEvent",
        `Processing link ${i + 1}/${arr.length}`
      );
      await page.goto(arr[i]);

      let thumb = await getMetaThumb(page);
      if (!thumb) {
        thumb = await getScrapedThumb(page);
      }
      if (!thumb) {
        thumb = null;
      }
      let title = await getMetaTitle(page);
      if (!title) {
        title = await getScrapedTitle(page);
      }
      if (!title) {
        title = null;
      }
      let favicon = await getFavicon(page);
      let url = arr[i];
      responseData.push({
        title,
        favicon,
        url,
        thumb,
      });
      console.log("pushed ", i);
    }
    browser.close();
  } catch (err) {
    res.json(err).status(500);
  }
  console.log("response sent");
  res.json(responseData).status(200);
};

module.exports = { fetchLinks, postLinks };
