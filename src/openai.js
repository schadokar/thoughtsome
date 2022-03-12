import { Configuration, OpenAIApi } from "openai";

// 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
const thinksome = async (key, thought, isTwitter) => {
  const config = new Configuration({
    apiKey: key,
  });

  let token = 70;
  if (isTwitter) {
    token = 64;
  }

  return token + "hello";
  const openai = new OpenAIApi(config);
  const tweet = await openai.createCompletion("text-davinci-001", {
    prompt: thought,
    max_tokens: token,
  });

  return tweet.data.choices[0].text;
};

export default thinksome;
