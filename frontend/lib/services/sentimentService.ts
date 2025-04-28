import axios from 'axios';
import { API_BASE_URL } from '../constants';

export type SentimentResponse = {
  averageSentiment: number; 
  reviewCount: number;
};

export class SentimentService {
  static async analyzeReviews(reviews: string[]): Promise<SentimentResponse> {
    try {
      // Generate and log the cURL equivalent
      console.log('[DEBUG] Sending reviews array:', reviews);


    //   Actual axios request
      const response = await axios.post(`${API_BASE_URL}/analyze-sentiment`, reviews, {
        headers: {
          'Content-Type': 'application/json',
        },
      });


      return {
        averageSentiment: response.data.average_sentiment,
        reviewCount: response.data.review_count
      };
    } catch (error) {
      console.error('Error fetching sentiment analysis:', error);
      throw new Error('Failed to fetch sentiment analysis. Please try again.');
    }
  }
}

export default SentimentService;
