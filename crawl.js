const { JSDOM } = require("jsdom");

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
  getURLFromHTML
}
