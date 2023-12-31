// Import the OpenAI class
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");

// Function to create embeddings
const createEmbedding = async (text) => {
  //  Create instance
  const embeddings = new OpenAIEmbeddings();
  //  Embed document
  try {
    const documentRes = await embeddings.embedDocuments([text]);
    // return results
    return documentRes[0];
  } catch (err) {
    console.log(err);
    return err;
  }
};

// Export the function
module.exports = createEmbedding;
