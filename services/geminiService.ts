import { GoogleGenAI } from "@google/genai";
import { DiaryInput, DiaryResponse } from "../types";

export const generateDiaryEntry = async (input: DiaryInput): Promise<DiaryResponse> => {
  // Initialize AI client inside the function
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelId = "gemini-2.5-flash";

  const systemInstruction = `
あなたは、小学生向けの日記作成支援AIです。
子供が書いた短いメモをもとに、**事実を捏造せず**、**話を盛ったり膨らませすぎたりしない**で、自然で読みやすい日記を作成してください。

【重要なルール：程よい書き方】
1. **事実の捏造禁止**: 入力にない人物、場所、行動を勝手に追加しない。
2. **膨らませすぎない（重要）**: 大げさな表現や、ポエムのような比喩、ドラマチックすぎる描写は避けてください。子供が日常で使う自然な言葉を選んでください。
3. **整理と接続**: 箇条書きのようなメモを、自然な文章につなげること（接続詞を補う、「てにをは」を直す）を重視してください。

【修正の度合い（例）】
- 入力「公園に行った」
  - OK（自然）: 「天気がよかったので、公園に行きました。」
  - NG（やりすぎ）: 「光り輝く太陽の下、緑が美しい公園へ冒険に出かけました。」
- 入力「楽しかった」
  - OK（自然）: 「とても楽しかったです。」「また行きたいなと思いました。」
  - NG（やりすぎ）: 「人生で一番の感動を味わい、心が躍りました。」

【出力構成】
以下の2つを含めてください。
1. **日記本文 (diaryBody)**: 学年（小学${input.grade}年生）に合わせた、自然で素朴な文章。長くなりすぎないようにしてください。
2. **工夫したポイント (feedbackPoints)**: 「言葉をつなげた」「わかりやすくした」など、どのように整えたかを3つ程度解説してください。

【学年別のトーン】
- 小1-2: 「〜しました。」「〜です。」など、丁寧で短い文。
- 小3-4: 習った漢字を使う。
- 小5-6: 高学年らしい、少し落ち着いた文章。

JSON形式で出力してください。
`;

  const prompt = `
以下の情報をもとに日記を作成してください。

- 学年: 小学${input.grade}年生
- 出来事: ${input.event}
- 思ったこと・感じたこと: ${input.feelings}
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: 'OBJECT',
          properties: {
            diaryBody: {
              type: 'STRING',
              description: "完成した日記の全文",
            },
            feedbackPoints: {
              type: 'ARRAY',
              description: "工夫した点や整えた箇所のリスト（3つ程度）",
              items: {
                type: 'OBJECT',
                properties: {
                  target: {
                    type: 'STRING',
                    description: "工夫した箇所（短い見出し）",
                  },
                  explanation: {
                    type: 'STRING',
                    description: "どのように直したか、なぜその表現を使ったかの解説",
                  },
                },
                required: ["target", "explanation"],
              },
            },
          },
          required: ["diaryBody", "feedbackPoints"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as DiaryResponse;
    }
    throw new Error("No response content generated.");
  } catch (error) {
    console.error("Error generating diary:", error);
    throw error;
  }
};