const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
  try {
    const responseHTML = await fetch(currentURL);
    if (responseHTML.status > 399) {
      console.log(`Error in fetch with status code ${responseHTML.status} on page ${currentURL}`)
      return;
    }
    const contentType = responseHTML.headers.get("content-type")
    if (!contentType.includes("text/html")) {
      console.log(`Non HTMl response , content type  : ${contentType} on page ${currentURL}`);
      return
    }
    console.log(await responseHTML.text())
  } catch (err) {
    console.log(`An Error occured in fetch : ${err} on page ${currentURL}`);
  }
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
