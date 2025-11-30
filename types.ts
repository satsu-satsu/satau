export type Grade = '1' | '2' | '3' | '4' | '5' | '6';

export interface DiaryInput {
  event: string;
  feelings: string;
  grade: Grade;
}

export interface FeedbackPoint {
  target: string;      // どの言葉・部分についてか
  explanation: string; // どう工夫したか、なぜ良いか
}

export interface DiaryResponse {
  diaryBody: string;         // 完成した日記の全文
  feedbackPoints: FeedbackPoint[]; // 工夫したポイントのリスト
}