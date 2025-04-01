import axios from 'axios';
import { Card } from '../domain/Card';

class CardApi{
    constructor(host = process.env.host){
        this.host = host;
    }

    async fetch(cursor, velocity){
        try {
            const response = await axios.get(`${this.host}/items`, {
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
          await this.api.post(`${this.host}/items/counts`, { updates });
        } catch (error) {
          console.error('Error saving card updates:', error);
          throw error;
        }
    }
}

export default CardApi;