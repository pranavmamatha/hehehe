const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateChatResponse = async (userMessage, threatData) => {
  try {
    // Filter and limit the threat data
    const simplifiedThreats = threatData.slice(0, 10).map(threat => ({
      title: threat.title,
      description: threat.description.substring(0, 200) + '...', // Limit description length
      created: threat.created,
      tags: threat.tags,
      threatLevel: threat.threatLevel
    }));

    const systemPrompt = `You are a cybersecurity expert assistant. Only answer questions related to cybersecurity threats and the provided threat data. 
    If the question is not related to cybersecurity or the provided threats, politely decline to answer.
    
    Here are the latest threats (limited to 10 most recent):
    ${JSON.stringify(simplifiedThreats, null, 2)}
    
    Please provide concise answers focusing on the most relevant threats to the user's query.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
};

module.exports = { generateChatResponse }; 