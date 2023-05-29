import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Fallback } from './components/fallback';
import {
  CategoryProvider,
  FavoriteProvider,
  ModalProvider,
  PlayerProvider,
  UserProvider,
  useUserContext,
} from './contexts';
import { Callback, Favorites, Login, Main } from './pages';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
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
    <ErrorBoundary fallbackRender={Fallback}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CategoryProvider>
            <FavoriteProvider>
              <PlayerProvider>
                <ModalProvider>
                  <Routes>
                    <Route path="/callback" element={<Callback />} />
                    <Route path="/" element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                      <Route element={<Main />} path="/main" />
                      <Route path="/favorites" element={<Favorites />} />
                    </Route>
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
    </ErrorBoundary>
  );
}

export default App;
