import { useEffect, useState } from 'react';
import { useAssistantByProxy } from '../../hooks/Azure.hooks';
import { IMessage } from '../../api/interfaces';

export const useChatContainer = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState('');

  const { isLoading, data, error } = useAssistantByProxy(messages);

  const sendMessage = (input: string) => {
    const newMessage: IMessage = {
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');
  };

  useEffect(() => {
    if (data) {
      console.log('Data received:', data);
      const assistantMessages = data.choices.map(choice => ({
        ...choice.message,
        timestamp: Date.now(),
      }));
      console.log('Assistant messages:', assistantMessages);
      setMessages(messages => [...messages, ...assistantMessages]);
    }
  }, [data]);

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
    { messages, input, loading: isLoading, error },
    {
      onClickSend,
      handleInputChange,
      setInput,
      onKeyDownSend,
      cleanChat,
    },
  ] as const;
};
