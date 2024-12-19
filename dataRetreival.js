// dataRetrieval.js
const axios = require('axios');

// /**
//  * Function to fetch posts from JSONPlaceholder with optional filtering and limit.
//  * @param {Object} queryParams - The query parameters (e.g., userId and _limit).
//  * @returns {Promise} - The promise resolving to the fetched data or error.
//  */
async function getPosts(queryParams) {
  try {
    const { userId, _limit } = queryParams;
    let apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    const params = {};

    if (userId) {
      params.userId = userId; // Filter by userId if provided
    }
    if (_limit) {
      params._limit = _limit; // Limit the number of posts if _limit is provided
    }

    // Fetch posts from JSONPlaceholder API
    const response = await axios.get(apiUrl, { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Error fetching posts');
  }
}

module.exports = { getPosts };
