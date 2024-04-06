import { useState } from 'react';

// Define a type for your component's props
type GenerateDeckModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (numQuestions: string, questionType: string) => void;
};

export default function GenerateDeckModal({ isOpen, onClose, onGenerate }: GenerateDeckModalProps) {
  const [numQuestions, setNumQuestions] = useState<string>('1');
  const [questionType, setQuestionType] = useState<string>('');

  const handleGenerateClick = () => {
    onGenerate(numQuestions, questionType);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Generate New Deck</h2>
        <div className="mb-4">
          <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700">Number of Questions:</label>
          <select
            id="numQuestions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={(i + 1).toString()}>{i + 1}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="questionType" className="block text-sm font-medium text-gray-700">Question Type:</label>
          <input
            id="questionType"
            type="text"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            placeholder="Enter question type"
            className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel
          </button>
          <button onClick={handleGenerateClick} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};