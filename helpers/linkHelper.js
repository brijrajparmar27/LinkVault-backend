const getMetaThumb = async (page) => {
  let MetaThumb = await page.evaluate(() => {
    let thumb = document.head
      .querySelector('meta[property="og:image"]')
      ?.getAttribute("content");
    return thumb;
  });
  return MetaThumb;
};
const getScrapedThumb = async (page) => {
  try {
    var ScrapedThumb = await page.evaluate(() => {
      let currentdimension = null;
      let maxdimension = 0;
      let maxsrc = null;
      const thumbpods = Array.from(document.querySelectorAll("img"));
      thumbpods.map((thumb) => {
        currentdimension = thumb.offsetHeight * thumb.offsetWidth;
        if (maxdimension < currentdimension) {
          maxdimension = currentdimension;
          maxsrc = thumb.getAttribute("src");
        }
      });
      return maxsrc;
    });
  } catch (err) {
    console.log(err);
  }
  return ScrapedThumb;
};
const getMetaTitle = async (page) => {
  try {
    var MetaTitle = await page.evaluate(() => {
      let title = document.head
        .querySelector('meta[property="og:title"]')
        ?.getAttribute("content");
      return title;
    });
  } catch (err) {
    console.log(err);
  }

  return MetaTitle;
};
const getScrapedTitle = async (page) => {
  try {
    var ScrapTitle = await page.evaluate(() => {
      // Create an XPath expression to select meta tags with name='title'
      var xpathExpression = "//meta[@name='title']";

      // Use document.evaluate() to search for meta tags
      var result = document.evaluate(
        xpathExpression,
        document,
        null,
        XPathResult.ANY_TYPE,
        null
      );

      // Iterate through the results
      var metaTags = [];
      var node;
      while ((node = result.iterateNext())) {
        metaTags.push(node);
      }

      return metaTags[0].content;
    });
  } catch (err) {
    console.log(err);
  }

  return ScrapTitle;
};
const getFavicon = async (page) => {
  try {
    var faviconHref = await page.$$eval(
      'link[rel="icon"], link[rel="shortcut icon"]',
      (elements) => {
        const hrefs = elements.map((el) => el.href);
        return hrefs.length ? hrefs[0] : null;
      }
    );
  } catch (err) {
    console.log(err);
  }

  return faviconHref;
};

module.exports = {
  getMetaThumb,
  getScrapedThumb,
  getMetaTitle,
  getScrapedTitle,
  getFavicon,
};
