const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {

  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++
    return pages;
  }

  pages[normalizedCurrentURL] = 1

  console.log(`Actively crawling ${currentURL}`)
  try {
    const responseHTML = await fetch(currentURL);
    if (responseHTML.status > 399) {
      console.log(`Error in fetch with status code ${responseHTML.status} on page ${currentURL}`)
      return pages;
    }
    const contentType = responseHTML.headers.get("content-type")
    if (!contentType.includes("text/html")) {
      console.log(`Non HTMl response , content type  : ${contentType} on page ${currentURL}`);
      return pages;
    }
    const htmlBody = await responseHTML.text()
    const nextURLs = getURLFromHTML(htmlBody, baseURL);
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.log(`An Error occured in fetch : ${err} on page ${currentURL}`);
  }
  return pages;
}

function getURLFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === '/') {
      //relative url
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`)
        urls.push(urlObj.href)
      } catch (ex) {
        console.log("error : ", ex.message)
      }
    }
    else {
      //absolute url
      try {
        const urlObj = new URL(linkElement.href)
        urls.push(urlObj.href);
        console.log(urlObj.href)
      } catch (ex) {
        console.log("url : ", linkElement.href)
        console.log("error : ", ex.message)
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const pathName = `${urlObj.hostname}${urlObj.pathname}`
  if (pathName.length > 0 && (pathName.at(pathName.length - 1) === '/')) {
    return pathName.slice(0, -1).toLowerCase();
  }
  else {
    return pathName.toLowerCase();
  }
};

module.exports = {
  normalizeURL,
  getURLFromHTML,
  crawlPage
}
