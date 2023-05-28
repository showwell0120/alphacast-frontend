/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, useEffect, useState } from 'react';

import { PlayStatus, PlayerContext } from '.';

export const PlayerProvider = (props: PropsWithChildren) => {
  const [episode, setEpisode] = useState<Spotify.Episode | null>(null);
  const [playStatus, setPlayStatus] = useState<PlayStatus>('none');

  const [embedController, setEmbedController] = useState<any>(null);

  const destroyPlayer = () => {
    setEpisode(null);
    setPlayStatus('none');
    embedController?.destroy();
    setEmbedController(null);
  };

  useEffect(() => {
    if (embedController) {
      embedController.addListener(
        'playback_update',
        (e: Spotify.EmbedControllerEvents) => {
          const { isPaused, isBuffering } = e.data;
          if (isPaused) {
            setPlayStatus('paused');
          } else if (!isPaused && !isBuffering) {
            setPlayStatus('playing');
          }
        }
      );
    }
  }, [embedController]);

  return (
    <PlayerContext.Provider
      value={{
        playStatus,
        episode,
        embedController,
        setEpisode,
        setEmbedController,
        destroyPlayer,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};
