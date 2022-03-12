import tweetCheck from "twitter-text";

const isValidTweet = (tweet) => {
  const { weightedLength, valid } = tweetCheck.parseTweet(tweet);

  return { weightedLength, tweetValidStatus: valid };
};

export default isValidTweet;
