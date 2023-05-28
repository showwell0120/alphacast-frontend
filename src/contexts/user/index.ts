import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface UserContextProps {
  user: Server.User | null;
  spotifyProfile: Spotify.Profile | null;
  spotifyTokenInfo: Spotify.TokenInfo | null;
  setUser: Dispatch<SetStateAction<Server.User | null>>;
  setSpotifyProfile: Dispatch<SetStateAction<Spotify.Profile | null>>;
  setSpotifyTokenInfo: Dispatch<SetStateAction<Spotify.TokenInfo | null>>;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  spotifyProfile: null,
  spotifyTokenInfo: null,
  setUser: () => null,
  setSpotifyProfile: () => null,
  setSpotifyTokenInfo: () => null,
});

export const useUserContext = () => useContext(UserContext);

export { UserProvider } from './user-provider';
