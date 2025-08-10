const { normalizeURL, getURLFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals")

test('normalizeURL strip protocol', () => {
  const input = "https://blog.myname/path"
  const actual = normalizeURL(input);
  const expected = "blog.myname/path"
  expect(actual).toEqual(expected)
})


test('normalizeURL trim trailing slashes', () => {
  const input = "https://blog.myname/path/"
  const actual = normalizeURL(input);
  const expected = "blog.myname/path"
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = "https://BLOG.myname/path"
  const actual = normalizeURL(input);
  const expected = "blog.myname/path"
  expect(actual).toEqual(expected)
})


test('normalizeURL strip http', () => {
  const input = "http://blog.myname/path"
  const actual = normalizeURL(input);
  const expected = "blog.myname/path"
  expect(actual).toEqual(expected)
})

test("getURLFromHTML absolute", () => {
  const inputHTML = `
    <html>
      <body>
        <a href="https://youtube.com/">Youtube</a>
      </body>
    </html>
  `
  const inputURL = "https://google.com"
  const actual = getURLFromHTML(inputHTML, inputURL);
  const expected = ["https://youtube.com/"]
  expect(actual).toEqual(expected);
})


test("getURLFromHTML relative", () => {
  const inputHTML = `
    <html>
      <body>
        <a href="/PewDiePie">Youtube PewDiePie</a>
      </body>
    </html>
  `
  const inputURL = "https://youtube.com"
  const actual = getURLFromHTML(inputHTML, inputURL);
  const expected = ["https://youtube.com/PewDiePie"]
  expect(actual).toEqual(expected);
})

test("getURLFromHTML both", () => {
  const inputHTML = `
    <html>
      <body>
        <a href="https://google.com/about/"> Google about</a>
        <a href="/PewDiePie">Youtube PewDiePie</a>
      </body>
    </html>
  `
  const inputURL = "https://youtube.com"
  const actual = getURLFromHTML(inputHTML, inputURL);
  const expected = ["https://google.com/about/", "https://youtube.com/PewDiePie"]
  expect(actual).toEqual(expected);
})

test("getURLFromHTML badUrl", () => {
  const inputHTML = `
    <html>
      <body>
        <a href="invalid">Youtube PewDiePie</a>
      </body>
    </html>
  `
  const inputURL = "https://youtube.com"
  const actual = getURLFromHTML(inputHTML, inputURL);
  const expected = []
  expect(actual).toEqual(expected);
})
