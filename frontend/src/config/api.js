// URL do seu backend no Render
const API_BASE_URL = 'https://meu-diario-backend.onrender.com';

// Função para verificar se backend está acordado
const wakeUpBackend = async () => {
  try {
    await fetch(`${API_BASE_URL}`, { method: 'GET' });
    return true;
  } catch (error) {
    return false;
  }
};

// Acordar backend imediatamente quando página carrega
if (typeof window !== 'undefined') {
  wakeUpBackend();
  
  // Ping contínuo para manter acordado
  setInterval(wakeUpBackend, 10 * 60 * 1000); // 10 minutos
}

// Função para fazer chamadas à API
export const api = {
  // GET
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },
  
  // POST - com wake up automático
  post: async (endpoint, data) => {
    // Acordar backend se necessário
    await wakeUpBackend();
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return response.json();  // ✅ ADICIONAR ESTA LINHA
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