import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.post("/old", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${prompt}` }],
    });
    res.status(200).send({
      bot: response,
    });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status); // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code); // e.g. 'invalid_api_key'
      console.error(error.type); // e.g. 'invalid_request_error'
      // Send error response
      res.status(error.status || 500).send({ error: error.message });
    } else {
      // Non-API error
      console.log(error);
      res.status(500).send({ error: "An unexpected error occurred." });
    }
  }
});

app.post("/gpt-4", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "string" }],
      messages: [{ role: "user", content: `${prompt}` }],
    });

    res.status(200).send({
      bot: response,
    });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status); // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code); // e.g. 'invalid_api_key'
      console.error(error.type); // e.g. 'invalid_request_error'
      // Send error response
      res.status(error.status || 500).send({ error: error.message });
    } else {
      // Non-API error
      console.log(error);
      res.status(500).send({ error: "An unexpected error occurred." });
    }
  }
});

app.post("/completions", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    console.log(response);

    res.status(200).send({
      bot: response.choices[0].text,
    });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status); // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code); // e.g. 'invalid_api_key'
      console.error(error.type); // e.g. 'invalid_request_error'
    } else {
      // Non-API error
      console.log(error);
    }
  }
});

app.post("/image", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.images.generate({ prompt: `${prompt}` });

    res.status(200).send({
      bot: response,
    });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status); // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code); // e.g. 'invalid_api_key'
      console.error(error.type); // e.g. 'invalid_request_error'
      // Send error response
      res.status(error.status || 500).send({ error: error.message });
    } else {
      // Non-API error
      console.log(error);
      res.status(500).send({ error: "An unexpected error occurred." });
    }
  }
});

app.listen(3000, () => {
  console.log("Server is running...");
});
