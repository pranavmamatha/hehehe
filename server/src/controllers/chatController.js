const { fetchPulses } = require('../services/alienVault');
const { generateChatResponse } = require('../services/openai');

const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    // Fetch latest threats
    const threats = await fetchPulses();

    // Generate response using OpenAI
    const response = await generateChatResponse(message, threats);

    res.json({
      success: true,
      response: response
    });

  } catch (error) {
    console.error('Error in chat handler:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process chat message',
      message: error.message
    });
  }
};

module.exports = { handleChat }; 