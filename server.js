const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("post.csv");

//Write Headers
writeStream.write(`Title,Link,Date \n`);

request("http://127.0.0.1:5500/index.html", (err, res, html) => {
  if (!err && res.statusCode === 200) {
    const $ = cheerio.load(html);

    // const siteHeading = $(".content");

    // console.log(siteHeading.html());
    // console.log(siteHeading.text());

    // const output = siteHeading.find("a").text();
    // console.log(output);
    $(".content").each((i, el) => {
      const title = $(el)
        .find(".title")
        .text();
      const date = $(el)
        .find(".date")
        .text();

      //Write ROW  CSV
      writeStream.write(`${title},${date} \n`);
    });
    console.log("Scrapping Done");
  } else {
    console.log(err);
  }
});
