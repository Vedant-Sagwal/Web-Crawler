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
  normalizeURL
}

