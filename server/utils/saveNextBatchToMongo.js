const fs = require("fs");
require("dotenv").config();
const Movie = require("../models/Movie");

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

const JSON_PATH = process.env.BATCHED_MOVIES_JSON_FILE_PATH;

fs.readFile(JSON_PATH, "utf8", async (err, data) => {
  if (err) {
    console.error("An error occurred while reading the JSON file:", err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonArray = JSON.parse(data);

    // find the batch to be processed
    let batchToBeProcessed;
    for (let batch of jsonArray) {
      if (batch.embedFlag && !batch.dbFlag) {
        batchToBeProcessed = batch;
        break;
      }
    }

    // save all items in this batch to db
    if (batchToBeProcessed) {
      const docsToBeAdded = [];
      for (let item of batchToBeProcessed.batchArr) {
        const newDoc = new Movie(item);
        docsToBeAdded.push(newDoc);
      }

      try {
        await Movie.insertMany(docsToBeAdded);
        // update the batch's dbFlag
        batchToBeProcessed.dbFlag = true;

        const updatedJson = JSON.stringify(jsonArray, null, 2);

        // update the json array
        fs.writeFile(JSON_PATH, updatedJson, "utf8", (writeErr) => {
          if (writeErr) {
            console.error(
              "An error occurred while writing to the JSON file:",
              writeErr
            );
            return;
          }
          console.log(
            `Batched JSON's batch ${batchToBeProcessed.batchNum} has been uploaded to DB`
          );
        });
      } catch (uploadErr) {
        console.error(
          "An error occurred while uploading the batch docs:",
          uploadErr
        );
      }
    } else {
      console.log("No batch found to process.");
    }
  } catch (parseErr) {
    console.error("An error occurred while parsing the JSON data:", parseErr);
  }
});
