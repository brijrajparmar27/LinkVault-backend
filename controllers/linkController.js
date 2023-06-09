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
  
  console.log("array created");
  let arr = JSON.parse(data);

  try {
    const browser = await puppeteer.launch({ headless: true });
    let processedCount = 0;

    const linkProcessingPromises = arr.map(async (url, i) => {
      
      console.log("processing url ", url)
      const page = await browser.newPage();
      
      await page.goto(url);
      
      let thumb = await getMetaThumb(page) || await getScrapedThumb(page);
      let title = await getMetaTitle(page) || await getScrapedTitle(page);
      let favicon = await getFavicon(page);
      
      global.socket.emit(
        "linkProcessEvent",
        `Processing link ${processedCount + 1}/${arr.length}`
      );
      processedCount++;

      return {
        title: title || url,
        favicon,
        url,
        thumb: thumb || null,
      };
    });

    console.time("scrapLinks")
    var responseData = await Promise.all(linkProcessingPromises);
    console.timeEnd("scrapLinks")
    browser.close();
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
      return;
    }

    console.log("response sent");
    
    LinkModel.insertMany(responseData).then((data)=>{
      console.log("data sent");
      console.log(data);
      res.json(data).status(200);
    }).catch((e)=>{
      console.log(e.message);
    })

  };


module.exports = { fetchLinks, postLinks };
