const API_BASE_URL = process.env.API_BASE_URL || 'http://192.168.1.224:3001/api';

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
    console.log('Fetching from:', `${API_BASE_URL}/recipes/search?q=${encodeURIComponent(query)}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(`${API_BASE_URL}/recipes/search?q=${encodeURIComponent(query)}`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Received data:', data);
    return data.recipes || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    console.error('API_BASE_URL:', API_BASE_URL);
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