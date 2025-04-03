import axios from 'axios';
import { Card } from '../domain/Card';

class CardApi{
    constructor(baseURL = process.env.REACT_APP_API_HOST) {
        this._baseURL = baseURL;
        this.api = axios.create({
            baseURL : this._baseURL // Set the base URL for all requests
          });
      }

    async fetch(cursor, velocity){
        try {
            const response = await this.api.get(`/items`, {
              params: {
                cursorId: cursor,
                scrollVelocity: velocity,
              }
            });
            return response.data.items.map((item) => new Card(item.id, item.value));
          } catch (error) {
            console.error('Error fetching cards:', error);
            throw error;
        }
    }

    async save(updates) {
        try {
          await this.api.post(`/items/counts`, { updates });
        } catch (error) {
          console.error('Error saving card updates:', error);
          throw error;
        }
    }
}

export default CardApi;