import type { Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ShowCard from '../../components/show-card';
import { ModalProvider } from '../../contexts/modal';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <ShowCard
          categoryId="1"
          description="Get the latest BBC World News: international news, features and analysis from Africa, the Asia-Pacific, Europe, Latin America, the Middle East, South Asia, ..."
          name="BBC World News"
          publisher="BBC World Service"
          id="1"
          images={[
            {
              url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
              height: 300,
              width: 300,
            },
          ]}
        />
      </ModalProvider>
    </QueryClientProvider>
  );
};

const Story: Meta<typeof App> = {
  component: App,
  title: 'ShowCard',
};
export default Story;

export const Default = {
  args: {},
};
