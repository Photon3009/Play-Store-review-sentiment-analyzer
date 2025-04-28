'use client';

type Props = {
  reviews: string[];
  isLoading: boolean;
};

export default function ReviewsSection({ reviews, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Reviews
        {reviews.length > 0 && (
          <span className="text-gray-500 font-normal text-sm ml-2">({reviews.length})</span>
        )}
      </h3>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
              <p className="mt-2 text-gray-700">{review}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">No reviews available for this app.</div>
      )}
    </div>
  );
}
