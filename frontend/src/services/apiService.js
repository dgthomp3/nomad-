const API_BASE_URL = process.env.API_BASE_URL || 'http://10.0.0.14:8080/api';

export const sendChatMessage = async (message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    return { response: 'Sorry, I had trouble understanding that.', intent: 'error' };
  }
};

export const searchRecipes = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.recipes || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return null;
  }
};