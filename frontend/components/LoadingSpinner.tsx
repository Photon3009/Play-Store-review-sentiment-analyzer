'use client';

type LoadingSpinnerProps = {
  showText?: boolean;
};

export default function LoadingSpinner({ showText = false }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col justify-center items-center mt-4 space-y-2">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      {showText && (
        <div className="animate-pulse text-sm text-gray-500">
          We are analyzing each review, it might take some time...
        </div>
      )}
    </div>
  );
}
