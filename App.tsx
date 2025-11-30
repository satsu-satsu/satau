import React, { useState } from 'react';
import DiaryForm from './components/DiaryForm';
import DiaryResult from './components/DiaryResult';
import { DiaryInput, DiaryResponse } from './types';
import { generateDiaryEntry } from './services/geminiService';
import { Pencil, Book, Cloud } from 'lucide-react';

function App() {
  const [result, setResult] = useState<DiaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (input: DiaryInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateDiaryEntry(input);
      setResult(data);
    } catch (err) {
      setError('ごめんね、うまく作れなかったよ。もう一度ためしてみてね。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] relative overflow-hidden flex flex-col">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 text-sky-200 opacity-50 -z-0">
        <Cloud size={120} />
      </div>
      <div className="absolute top-20 right-20 text-sky-200 opacity-50 -z-0 hidden md:block">
        <Cloud size={80} />
      </div>
      <div className="absolute bottom-10 left-1/4 text-yellow-100 opacity-60 -z-0">
         <Book size={150} />
      </div>

      {/* Header */}
      <header className="pt-8 pb-4 px-4 text-center relative z-10">
        <div className="inline-flex items-center justify-center bg-white px-6 py-3 rounded-full shadow-md mb-2">
            <Pencil className="text-orange-400 mr-2 h-6 w-6" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-700 tracking-wider">
               Diary Assist Buddy
            </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6 relative z-10">
        {error && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl relative text-center font-bold">
            {error}
          </div>
        )}

        {!result ? (
          <DiaryForm onSubmit={handleGenerate} isLoading={isLoading} />
        ) : (
          <DiaryResult result={result} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 text-sm relative z-10">
        <p>&copy; 2024 Diary Assist Buddy | Powered by Gemini</p>
      </footer>
    </div>
  );
}

export default App;