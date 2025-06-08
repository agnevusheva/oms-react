const baseUrl = 'https://config-server-ytyo.onrender.com';

export const enum Endpoints {
  ITEMS = 'items',
  TABLES = 'tables',
}

class BackofficeService {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint: Endpoints) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  async getItems() {
    return this.get(Endpoints.ITEMS);
  }

  async getTables() {
    return this.get(Endpoints.TABLES);
  }
}

export const backofficeAPI = new BackofficeService(baseUrl);

export default BackofficeService;
