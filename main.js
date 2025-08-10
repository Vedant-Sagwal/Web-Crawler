const { crawlPage } = require("./crawl");


function main() {
  if (process.argv.length < 3) {
    console.log("No Website Provided!!");
    process.exit(1)
  }
  else {
    for (let i = 2; i < process.argv.length; i++) {
      console.log(`Crawling ${process.argv[i]}`);
      crawlPage(process.argv[i]);
    }
  }
}


main()
