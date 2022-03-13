import { Configuration, OpenAIApi } from "openai";

const thinksome = async (key, token, thought, isTwitter) => {
  const config = new Configuration({
    apiKey: key,
  });

  console.log(typeof token);
  return "asd";
  if (!token) {
    token = 70;
  }

  if (isTwitter) {
    token = 64;
  }

  const openai = new OpenAIApi(config);
  const tweet = await openai.createCompletion("text-davinci-001", {
    prompt: thought,
    max_tokens: token,
  });

  return tweet.data.choices[0].text;
};

export default thinksome;
