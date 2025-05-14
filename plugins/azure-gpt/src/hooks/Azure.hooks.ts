import { useApi } from '@backstage/core-plugin-api';
import { useQuery } from '@tanstack/react-query';
import { azureGptApiRef } from '../api';
import { AzureGptResponse, IMessage } from '../api/interfaces';

export const useAssistantByProxy = (messages: IMessage[]) => {
  const azureGptApi = useApi(azureGptApiRef);

  const enabled =
    messages.length > 0 && messages[messages.length - 1].role === 'user';

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['assistantResponse', messages],
    queryFn: () => azureGptApi.askUsingProxy<AzureGptResponse>(messages),
    enabled,
  });

  return { data, isLoading, error, refetch };
};
