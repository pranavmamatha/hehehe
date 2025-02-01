const { fetchPulses } = require('../services/alienVault');

const getNews = async (req, res) => {
  try {
    const pulses = await fetchPulses();
    res.json({
      success: true,
      data: pulses
    });
  } catch (error) {
    console.error('Error in getNews controller:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news',
      message: error.message
    });
  }
};

module.exports = { getNews }; 