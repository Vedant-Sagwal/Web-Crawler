const { crawlPage } = require("./crawl");
const { printReport } = require("./report.js")

async function main() {
  if (process.argv.length < 3) {
    console.log("No Website Provided!!");
    process.exit(1)
  }
  else {
    for (let i = 2; i < process.argv.length; i++) {
      console.log(`Starting Crawling at ${process.argv[i]}`);
      const pages = await crawlPage(process.argv[i], process.argv[i], {});
      printReport(pages)
    }
  }
}


main()
