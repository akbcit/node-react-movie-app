const fs = require("fs");
require("dotenv").config();
const createEmbedding = require("../utils/createEmbeddings");

const JSON_PATH = process.env.BATCHED_MOVIES_JSON_FILE_PATH;

fs.readFile(JSON_PATH, "utf-8", async (err, data) => {
  if (err) {
    console.error("An error occurred while reading the JSON file:", err);
    return;
  }

  try {
    const jsonArray = JSON.parse(data);

    let batchToBeProcessed;
    for (let batch of jsonArray) {
      if (!batch.embedFlag) {
        batchToBeProcessed = batch;
        break;
      }
    }

    if (batchToBeProcessed) {
      // Parallelize embedding creation if possible
      const embedPromises = batchToBeProcessed.batchArr.map((item) =>
        createEmbedding(item.description).then(
          (embedding) => (item.embedding = embedding)
        )
      );
      await Promise.all(embedPromises);

      // Update the embedFlag for the processed batch
      batchToBeProcessed.embedFlag = true;

      const updatedJson = JSON.stringify(jsonArray, null, 2);

      // update the jason array
      fs.writeFile(JSON_PATH, updatedJson, "utf8", (writeErr) => {
        if (writeErr) {
          console.error(
            "An error occurred while writing to the JSON file:",
            writeErr
          );
          return;
        }
        console.log(`Batched JSON has been updated with embeddings for batch: ${batchToBeProcessed.batchNum}`);
      });
    } else {
      console.log("No batch found to process.");
    }
  } catch (parseErr) {
    console.error("An error occurred while parsing the JSON data:", parseErr);
  }
});
