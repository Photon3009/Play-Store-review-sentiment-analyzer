'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SentimentService, { SentimentResponse } from '@/lib/services/sentimentService';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

type Props = {
  reviews: string[]; // List of reviews (strings)
};

const SentimentAnalysis: React.FC<Props> = ({ reviews }) => {
  // Use React Query to get sentiment analysis for the reviews
  const { data, isLoading, isError, error } = useQuery<SentimentResponse>({
    queryKey: ['sentimentAnalysis', reviews],
    queryFn: () => SentimentService.analyzeReviews(reviews), 
    enabled: reviews.length > 0, // Only fetch if there are reviews
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  // Error handling message
  const errorMessage = error instanceof Error ? error.message : '';

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sentiment Analysis</h2>

      {/* Loading Spinner */}
      {isLoading && <LoadingSpinner showText={true} />}

      {/* Error Message */}
      {isError && <ErrorMessage message={errorMessage} />}

      {/* Display Results */}
      {data && !isLoading && !isError && (
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Review Count: 100</h3>
            <p className="text-gray-600">Average sentiment score: {data.averageSentiment.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Display No Data message */}
      {reviews.length === 0 && <p className="text-gray-500">No reviews provided.</p>}
    </div>
  );
};

export default SentimentAnalysis;
