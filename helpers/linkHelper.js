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
  getFavicon,
};
