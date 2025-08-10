const { sortPages } = require("./report.js")
const { test, expect } = require("@jest/globals")

test('sortPages ', () => {
  const input = {
    'https://google.com': 3,
    'https://youtube.com': 5
  }
  const actual = sortPages(input);
  const expected = [
    ['https://youtube.com', 5],
    ['https://google.com', 3]
  ]
  expect(actual).toEqual(expected)
})

test('sort 5 pages', () => {
  const input = {
    'https://google.com': 3,
    'https://youtube.com': 5,
    'https://youtube.com/path': 5,
    'https://youtube.com/path3': 8,
    'https://youtube.com/path4': 2,
  }
  const actual = sortPages(input);
  const expected = [
    ['https://youtube.com/path3', 8],
    ['https://youtube.com', 5],
    ['https://youtube.com/path', 5],
    ['https://google.com', 3],
    ['https://youtube.com/path4', 2],
  ]
  expect(actual).toEqual(expected)
})
