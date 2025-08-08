const { normlizeURL, normalizeURL } = require("./crawl.js");
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
