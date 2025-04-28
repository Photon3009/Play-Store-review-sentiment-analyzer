'use client';

import { useState, useRef } from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import PlayStoreService, { App } from '@/lib/services/playStoreService';
import SearchInput from '@/components/play_store/SearchInput';
import SearchResultsDropdown from '@/components/play_store/SearchResultsDropdown';
import SelectedAppCard from '@/components/play_store/SelectedAppCard';
import ReviewsSection from '@/components/play_store/ReviewSection';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SentimentAnalysis from '@/components/sentiment_analysis/SentimentAnalysis';

const queryClient = new QueryClient();

export default function PlayStoreSearchWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <PlayStoreSearch />
    </QueryClientProvider>
  );
}

export function PlayStoreSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<App | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const debouncedSetQuery = useRef(
    debounce((value: string) => {
      setDebouncedQuery(value);
    }, 300)
  ).current;

  const { data: apps = [], isLoading: isSearchLoading, error: searchError } = useQuery({
    queryKey: ['searchApps', debouncedQuery],
    queryFn: () => PlayStoreService.searchApps(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const { data: reviews = [], isLoading: isReviewsLoading, error: reviewsError } = useQuery({
    queryKey: ['appReviews', selectedApp?.appId],
    queryFn: () => PlayStoreService.fetchReviews(selectedApp?.appId || ''),
    enabled: !!selectedApp?.appId,
    staleTime: 5 * 60 * 1000,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSetQuery(value);
  };

  const handleSelectApp = (app: App) => {
    setSelectedApp(app);
    setQuery('');
    setDebouncedQuery('');
    searchInputRef.current?.focus();
  };

  const handleClearSelection = () => {
    setSelectedApp(null);
    setQuery('');
    setDebouncedQuery('');
    searchInputRef.current?.focus();
  };

  const errorMessage = searchError
    ? (searchError as Error).message
    : reviewsError
    ? (reviewsError as Error).message
    : '';

      // Get top 5 reviews by slicing the first 5
  const top5Reviews = reviews.slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Google Play Store Search</h1>
        <p className="text-shadow-white">Search for apps and read their reviews</p>
      </div>

      <SearchInput
        query={query}
        onChange={handleInputChange}
        onClear={() => {
          setQuery('');
          setDebouncedQuery('');
        }}
        inputRef={searchInputRef}
      />

      {debouncedQuery && apps.length > 0 && !selectedApp && (
        <SearchResultsDropdown apps={apps} onSelect={handleSelectApp} inputRef={searchInputRef} />
      )}

      {isSearchLoading && <LoadingSpinner />}

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {selectedApp && (
               <>
               <SelectedAppCard app={selectedApp} onClear={handleClearSelection} />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                 {/* Review Section */}
                 <div className="col-span-1">
                   <ReviewsSection reviews={reviews} isLoading={isReviewsLoading} />
                 </div>
     
                 {/* Sentiment Analysis Section */}
                 <div className="col-span-1">
                   <SentimentAnalysis reviews={top5Reviews} />
                 </div>
               </div>
             </>
      )}
    </div>
  );
}
