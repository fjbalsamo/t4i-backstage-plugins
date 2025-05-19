export type IMessage = {
  content: string;
  role: 'user' | 'assistant';
  timestamp?: number;
};
export type GptService = {
  getChatResponse: (input: IMessage[]) => Promise<IMessage[]>;
};
