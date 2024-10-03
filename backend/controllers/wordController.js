const axios = require("axios");
const Word = require("../models/Word");

const fetchWordFromAPI = async (word) => {
  const appId = process.env.OXFORD_APP_ID;
  const appKey = process.env.OXFORD_APP_KEY;
  const url = `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}`;

  try {
    const response = await axios.get(url, {
      headers: { app_id: appId, app_key: appKey },
    });
    console.log("API response:", response.data);

    // Check if the API response contains the expected structure
    if (response.data.results && response.data.results.length > 0) {
      const result = response.data.results[0].lexicalEntries[0].entries[0];
      const definition = result.senses[0].definitions[0];
      const phonetics =
        response.data.results[0].lexicalEntries[0].pronunciations[0]
          ?.phoneticSpelling || "N/A";
      const examples = result.senses[0].examples
        ? result.senses[0].examples.map((example) => example.text)
        : [];

      // Log the fetched data
      console.log("Fetched data from API:", {
        word,
        definition,
        phonetics,
        examples,
      });

      return { word, definition, phonetics, examples };
    } else {
      throw new Error("No results found for the word");
    }
  } catch (error) {
    console.log(
      "Oxford API error:",
      error.response ? error.response.data : error.message
    );
    throw error; // Rethrow the error to handle it in the addWord function
  }
};

exports.addWord = async (req, res) => {
  const { word } = req.body;
  try {
    // Check if the word exists in the database
    let wordData = await Word.findOne({ word });
    if (!wordData) {
      // Fetch from the API if it doesn't exist
      wordData = await fetchWordFromAPI(word);
      const newWord = new Word(wordData);
      await newWord.save();
    }
    res.json(wordData); // Respond with the word data
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching word", error: error.message });
  }
};

exports.getWords = async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving words", error: error.message });
  }
};
