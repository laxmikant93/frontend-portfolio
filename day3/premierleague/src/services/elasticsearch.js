import axios from 'axios';

const ES_URL = process.env.VUE_APP_ELASTICSEARCH_URL;

export const searchPlayers = async (query) => {
  try {
    const response = await axios.post(`${ES_URL}/premier_league_players/_search`, {
      query: {
        match: {
          player_name: {
            query: query,
            fuzziness: "AUTO"
          }
        }
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
};
