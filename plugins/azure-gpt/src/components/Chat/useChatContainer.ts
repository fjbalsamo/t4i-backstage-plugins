import { useState } from 'react';

type Message = {
  sender: 'user' | 'assistant';
  text: string;
};

export const useChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = (input: string) => {
    const newMessage: Message = {
      sender: 'user',
      text: input,
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');

    // Simulate a response from the assistant
    setLoading(true);
    setTimeout(() => {
      const assistantMessage: Message = {
        sender: 'assistant',
        text: `You said: ${input}`,
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setLoading(false);
    }, 1000);
  };

  const onClickSend = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    if (input.trim() === '') return;
    sendMessage(input);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onKeyDownSend = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (input.trim() === '') return;
      sendMessage(input);
    }
  };

  const cleanChat = () => {
    setMessages([]);
    setInput('');
  };

  return [
    { messages, input, loading },
    {
      onClickSend,
      handleInputChange,
      setInput,
      onKeyDownSend,
      cleanChat
    },
  ] as const;
};
