const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const generateDescription = async ({
    tweetTitle,
    domain,
    keyWords,
    tone,
    numChars,
  }) => {
    try {
      // const response = await fetch(
      //   "https://api.openai.com/v1/engines/text-davinci-003/completions",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      //     },
      //     body: JSON.stringify({
      //       prompt: `Write a job description for a  ${tweetTitle} role 
      //       ${domain ? `in the ${domain} domain` : ""} that is around ${
      //         numChars || 200
      //       } words in a ${tone || "neutral"} tone. ${
      //         keyWords ? `Incorporate the following keywords: ${keyWords}.` : ""
      //       }. The job position should be described in a way that is SEO friendly, highlighting its unique features and benefits.`,
      //       max_tokens: 100,
      //       temperature: 0.5,
      //     }),
      //   }
      // );

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `I'm looking for an effective strategy to start a twitter thread about ${tweetTitle}  
        ${domain ? `in the ${domain} domain` : ""} that is around ${
          numChars || 5
        } tweets long in a ${tone || "neutral"} tone. ${
          keyWords ? `Incorporate the following keywords: ${keyWords}.` : ""
        }. Write a twitter thread for me that is informative, entertaining and shareable.`,
        max_tokens: 1000,
        temperature: 0.6,
      });      
  
      return response.data.choices[0].text;
    } catch (err) {
      console.error(err);
    }
  };
  
  export default async function handler(req, res) {
    const { tweetTitle, domain, keyWords, tone, numChars } = req.body;
  
    const tweet = await generateDescription({
      tweetTitle,
      domain,
      keyWords,
      tone,
      numChars,
    });
    // console.log(tweet)
    res.status(200).json({
      tweet,
    });
  }