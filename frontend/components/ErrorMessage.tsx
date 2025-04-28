'use client';

type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
      {message}
    </div>
  );
}
