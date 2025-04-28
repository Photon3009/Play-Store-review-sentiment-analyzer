'use client';

import { App } from '@/lib/services/playStoreService';

type Props = {
  apps: App[];
  onSelect: (app: App) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export default function SearchResultsDropdown({ apps, onSelect, inputRef }: Props) {
  // Get the width of the input field
  const inputWidth = inputRef.current?.offsetWidth;

  return (
    <div
      className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto"
      style={{ width: inputWidth }}
    >
      {apps.map((app) => (
        <div
          key={app.appId}
          onClick={() => onSelect(app)}
          className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
        >
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">{app.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
