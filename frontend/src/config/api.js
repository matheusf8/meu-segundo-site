// URL do seu backend no Render
const API_BASE_URL = 'https://meu-diario.onrender.com';

// Função para fazer chamadas à API
export const api = {
  // GET
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },
  
  // POST
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  // PUT
  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  // DELETE
  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    return response.json();
  }
};

export default API_BASE_URL;