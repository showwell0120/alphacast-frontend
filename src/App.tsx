import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import {
  CategoryProvider,
  FavoriteProvider,
  ModalProvider,
  PlayerProvider,
  UserProvider,
  useUserContext,
} from './contexts';
import { Callback, Login } from './pages';

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

function ProtectedRoute({ redirectPath = '/' }) {
  const { user, spotifyTokenInfo } = useUserContext();

  if (!user && !spotifyTokenInfo) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CategoryProvider>
            <FavoriteProvider>
              <PlayerProvider>
                <ModalProvider>
                  <Routes>
                    <Route path="/callback" element={<Callback />} />
                    <Route path="/" element={<Login />} />
                    <Route element={<ProtectedRoute />}></Route>
                  </Routes>
                </ModalProvider>
              </PlayerProvider>
            </FavoriteProvider>
          </CategoryProvider>
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
