const axios = require('axios');

const OTX_API_KEY = '044a3d5582a49575ee6f1d37560ccc87318f232239bc7b1f915feb9315045862';
const OTX_API_URL = 'https://otx.alienvault.com/api/v1';

const fetchPulseDetails = async (pulseId) => {
  try {
    const response = await axios.get(`${OTX_API_URL}/pulses/${pulseId}`, {
      headers: {
        'X-OTX-API-KEY': OTX_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching pulse details for ${pulseId}:`, error);
    return null;
  }
};

const fetchPulses = async () => {
  try {
    // Fetch multiple pages of pulses
    const allPulses = [];
    const limit = 50; // Maximum allowed per page
    const pages = 3; // Fetch 3 pages to get at least 100 pulses

    const fetchPromises = Array.from({ length: pages }, (_, i) => {
      return axios.get(`${OTX_API_URL}/pulses/subscribed`, {
        headers: {
          'X-OTX-API-KEY': OTX_API_KEY
        },
        params: {
          limit: limit,
          page: i + 1,
          modified_since: '2020-01-01'
        }
      });
    });

    const responses = await Promise.all(fetchPromises);

    // Combine all responses
    responses.forEach(response => {
      const pulses = response.data.results.map(pulse => ({
        id: pulse.id,
        title: pulse.name,
        description: pulse.description,
        created: pulse.created,
        tags: pulse.tags || [],
      }));
      allPulses.push(...pulses);
    });

    console.log(`Fetched ${allPulses.length} pulses in total`);
    return allPulses;

  } catch (error) {
    console.error('Error fetching pulses from OTX:', error);
    throw error;
  }
};

module.exports = { fetchPulses }; 