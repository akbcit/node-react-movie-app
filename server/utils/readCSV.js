const fs = require("fs");
const csv = require("csv-parser");
require("dotenv").config();

// Create an empty array to hold our data
const results = [];
let count = 0; 
// decide fields we want to store
const fields = ["tmdbID", "title", "description"];

// start a file read stream and pipe it to a write stream
const path = process.env.MOVIES_FILE_PATH;
fs.createReadStream(path)
  .pipe(csv())
  .on("data", (data) => {
    const row = {};
    fields.forEach((field) => {
      row[field] = data[field];
    });
    count++;
    results.push(row);
  })
  .on("end", () => {
    console.log("CSV file successfully processed.");

    // Convert the data to JSON format
    const jsonData = JSON.stringify(results, null, 2);

    // Write the JSON data to a file
    fs.writeFile("data/movies.json", jsonData, (err) => {
      if (err) {
        console.error("An error occurred:", err);
        return;
      }
      console.log(`Data written to movies.json with ${count} entries`);
    });
  });



