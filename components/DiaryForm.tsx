import React, { useState } from 'react';
import { DiaryInput, Grade } from '../types';
import { GRADES } from '../constants';
import { Loader2 } from 'lucide-react';

interface DiaryFormProps {
  onSubmit: (input: DiaryInput) => void;
  isLoading: boolean;
}

const DiaryForm: React.FC<DiaryFormProps> = ({ onSubmit, isLoading }) => {
  const [grade, setGrade] = useState<Grade>('1');
  const [event, setEvent] = useState('');
  const [feelings, setFeelings] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!event.trim()) return;
    onSubmit({ grade, event, feelings });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-lg border-4 border-sky-100">
      
      <div className="mb-6">
        {/* Grade Selection */}
        <label className="block text-gray-700 font-bold mb-2 text-lg">
          学年（がくねん）
        </label>
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value as Grade)}
          className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-sky-400 focus:outline-none text-lg bg-gray-50 text-gray-900"
        >
          {GRADES.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </div>

      {/* Event Input */}
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2 text-lg">
          出来事（なにをしたの？）
        </label>
        <textarea
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          placeholder="例：今日、学校の帰りに公園で猫を見つけたよ。"
          className="w-full p-4 h-24 rounded-xl border-2 border-gray-200 focus:border-sky-400 focus:outline-none text-lg resize-none bg-gray-50 text-gray-900 placeholder-gray-400"
          required
        />
      </div>

      {/* Feelings Input */}
      <div className="mb-8">
        <label className="block text-gray-700 font-bold mb-2 text-lg">
          思ったこと（どう思った？）
        </label>
        <textarea
          value={feelings}
          onChange={(e) => setFeelings(e.target.value)}
          placeholder="例：真っ白でふわふわして可愛かった。触りたかったけど逃げちゃって残念。"
          className="w-full p-4 h-24 rounded-xl border-2 border-gray-200 focus:border-sky-400 focus:outline-none text-lg resize-none bg-gray-50 text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !event.trim()}
        className={`w-full py-4 px-6 rounded-full text-white font-bold text-xl shadow-md transition-all transform hover:scale-[1.02] active:scale-95 flex justify-center items-center
          ${isLoading || !event.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-400 hover:bg-orange-500'}
        `}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2 h-6 w-6" />
            かんがえ中...
          </>
        ) : (
          '日記をつくる！ 📝'
        )}
      </button>
    </form>
  );
};

export default DiaryForm;