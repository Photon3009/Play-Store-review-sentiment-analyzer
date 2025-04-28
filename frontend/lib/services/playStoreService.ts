import axios from 'axios';
import { API_BASE_URL } from '../constants';

export type App = {
  appId: string;
  title: string;
};

export class PlayStoreService {
  // Search for apps based on query string
  static async searchApps(query: string): Promise<App[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/search-apps`, {
        params: { query }
      });
      
      return response.data.apps || [];
    } catch (error) {
      console.error('Error searching apps:', error);
      throw new Error('Failed to search apps. Please try again.');
    }
  }

  // Fetch reviews for a specific app
  static async fetchReviews(appId: string): Promise<string[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetch-reviews`, {
        params: { app_id: appId }
      });
      
      return response.data.reviews || [];
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw new Error('Failed to fetch reviews. Please try again.');
    }
  }
}

export default PlayStoreService;