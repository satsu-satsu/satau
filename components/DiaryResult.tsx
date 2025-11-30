import React from 'react';
import { DiaryResponse } from '../types';
import { RefreshCw, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface DiaryResultProps {
  result: DiaryResponse;
  onReset: () => void;
}

const DiaryResult: React.FC<DiaryResultProps> = ({ result, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fadeIn pb-10 flex flex-col gap-8">
      
      {/* 1. 完成した日記エリア */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-sky-100 relative">
        <div className="bg-sky-100 p-4 flex items-center justify-center">
             <BookOpen className="text-sky-600 mr-2" />
             <h2 className="text-xl font-bold text-sky-700">完成した日記</h2>
        </div>

        <div className="p-8 md:p-12 relative min-h-[300px]">
           {/* ノートの罫線背景 */}
           <div className="absolute inset-0 pointer-events-none opacity-20" 
                style={{
                  backgroundImage: 'linear-gradient(#444 1px, transparent 1px)',
                  backgroundSize: '100% 2.5em',
                  marginTop: '2.4em'
                }} 
           />
           {/* 赤い縦線（マージン） */}
           <div className="absolute top-0 bottom-0 left-8 md:left-12 w-px bg-red-200" />

           <div className="relative z-10 text-lg md:text-2xl leading-[2.5em] text-gray-800 font-medium tracking-wide whitespace-pre-wrap pl-6 md:pl-8 font-zen">
             {result.diaryBody}
           </div>
        </div>
      </div>

      {/* 2. 工夫ポイント解説エリア */}
      <div className="bg-orange-50 rounded-3xl p-6 md:p-8 border-2 border-orange-200">
        <div className="flex items-center mb-6">
          <Sparkles className="text-orange-500 mr-2 h-6 w-6" />
          <h3 className="text-xl font-bold text-orange-800">ここを工夫して文章をふくらませたよ！</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {result.feedbackPoints.map((point, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-orange-100 flex flex-col">
              <div className="flex items-start mb-2">
                <CheckCircle2 className="text-green-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="font-bold text-gray-800">{point.target}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed pl-7">
                {point.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* アクションボタン */}
      <div className="flex justify-center mt-4">
        <button
          onClick={onReset}
          className="flex items-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-600 rounded-full font-bold hover:bg-gray-100 hover:border-sky-300 hover:text-sky-600 transition-all shadow-md"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          もういちど書く
        </button>
      </div>

    </div>
  );
};

export default DiaryResult;