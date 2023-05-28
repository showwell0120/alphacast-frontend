import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ToastContainer } from 'react-toastify';

import { CategoryProvider, UserProvider } from './contexts';

// Create a client
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: error => {
      const response = error as AxiosError;
      console.log(response);
    },
  }),
  queryCache: new QueryCache({
    onError: error => {
      const response = error as AxiosError;
      console.log(response.code);
    },
  }),
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CategoryProvider></CategoryProvider>
        </UserProvider>
      </QueryClientProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
