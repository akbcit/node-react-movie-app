const fs = require("fs");
require("dotenv").config();

const JSON_PATH = process.env.MOVIES_JSON_FILE_PATH;
const BATCH_SIZE = 500;
const BATCH_FLAGS = ["dbFlag", "embedFlag"];
const BATCHED_JSON_PATH = "data/batched_movies.json";

fs.readFile(JSON_PATH, "utf8", (err, data) => {
  if (err) {
    console.error("An error occurred while reading the JSON file:", err);
    return;
  }

  // Parse the JSON data
  const jsonArray = JSON.parse(data);

  // create an empty results array
  const result = [];

  // find number of batches
  const numBatches = Math.ceil(jsonArray.length / BATCH_SIZE);

  let count = 0;

  // iterate through array and create batched arrays
  for (let i = 1; i <= numBatches; i++) {
    const startIndex = (i - 1) * BATCH_SIZE;
    const endIndex =
      startIndex + BATCH_SIZE < jsonArray.length
        ? startIndex + BATCH_SIZE
        : jsonArray.length;
    // create a batch object with an empty batch Array
    const batch = { batchNum: i, batchArr: [] };
    // add flags
    BATCH_FLAGS.forEach((flag) => {
      batch[flag] = false;
    });
    // iterate over jsonArray and add its items from start to end indices for this batch
    for (let j = startIndex; j < endIndex; j++) {
      batch.batchArr.push(jsonArray[j]);
      count++;
    }
    // add batch object to results array
    result.push(batch);
  }

  // Convert the updated array back to a JSON string
  const resultString = JSON.stringify(result, null, 2);

  // Write the JSON string back to the file
  fs.writeFile(BATCHED_JSON_PATH, resultString, "utf8", (err) => {
    if (err) {
      console.error(
        "An error occurred while writing to the Bacthed JSON file:",
        err
      );
      return;
    }
    console.log(`Batched JSON file has been created with ${count} entries`);
  });
});
