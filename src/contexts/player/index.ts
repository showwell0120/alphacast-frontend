/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export type PlayStatus = 'playing' | 'paused' | 'none';

export interface PlayerContextProps {
  playStatus: PlayStatus;
  episode: Spotify.Episode | null;
  embedController: any;
  setEpisode: Dispatch<SetStateAction<Spotify.Episode | null>>;
  setEmbedController: Dispatch<SetStateAction<any>>;
  destroyPlayer: () => void;
}

export const PlayerContext = createContext<PlayerContextProps>({
  playStatus: 'none',
  episode: null,
  embedController: null,
  setEpisode: () => null,
  setEmbedController: () => null,
  destroyPlayer: () => null,
});

export const usePlayerContext = () => useContext(PlayerContext);

export { PlayerProvider } from './provider';
