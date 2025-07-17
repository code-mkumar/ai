const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event, context) => {
  const { message } = JSON.parse(event.body || "{}");
  const apiKey = "KeyAIzaSyCj2bshMo8Uo3_EuRWytkEKEWoIu0riVR8";

  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "API key missing" }) };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: text }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
