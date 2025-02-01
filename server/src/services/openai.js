const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateChatResponse = async (userMessage, threatData) => {
  try {
    // Format threats with limited description length
    const formattedThreats = threatData
      .slice(0, 30) // Limit to 30 most recent threats
      .map(threat => ({
        title: threat.title,
        description: threat.description.substring(0, 250), // Limit description to 250 chars
        created: new Date(threat.created).toLocaleDateString(),
        tags: threat.tags.slice(0, 3) // Limit to 3 most relevant tags
      }));

    const systemPrompt = `You are a cybersecurity expert assistant analyzing these threats:

${formattedThreats.map(threat => 
  `[${threat.created}] ${threat.title}
${threat.tags.join(', ')}
${threat.description}
---`).join('\n')}

Instructions:
1. Provide detailed analysis of relevant threats
2. Reference threats by name
3. Give actionable mitigation strategies
4. Only discuss cybersecurity topics
5. Decline non-security questions`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { 
          role: "system", 
          content: systemPrompt 
        },
        { 
          role: "user", 
          content: userMessage 
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
};

module.exports = { generateChatResponse }; 