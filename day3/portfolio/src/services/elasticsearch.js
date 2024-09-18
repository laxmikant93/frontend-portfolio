import axios from 'axios';

const ES_URL = 'http://34.71.70.164:9200'; // Update this URL if your Elasticsearch is hosted elsewhere

export const search = async (index, query) => {
  try {
    const response = await axios.post(`${ES_URL}/${index}/_search`, {
      query: {
        match: {
          _all: query
        }
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching Elasticsearch:', error);
    throw error;
  }
};

export const autocomplete = async (index, query) => {
  try {
    const response = await axios.post(`${ES_URL}/${index}/_search`, {
      suggest: {
        text: query,
        simple_phrase: {
          phrase: {
            field: 'title', // Adjust the field as necessary
            size: 1,
            gram_size: 2,
            direct_generator: [
              {
                field: 'title',
                suggest_mode: 'always'
              }
            ]
          }
        }
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    throw error;
  }
};
