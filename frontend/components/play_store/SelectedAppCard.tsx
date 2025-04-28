'use client';

import { App } from '@/lib/services/playStoreService';
import { X } from 'lucide-react';

type Props = {
  app: App;
  onClear: () => void;
};

export default function SelectedAppCard({ app, onClear }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-800">{app.title}</h2>
            <button onClick={onClear} className="p-1 rounded-full hover:bg-gray-100">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
