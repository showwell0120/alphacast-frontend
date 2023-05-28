import { PropsWithChildren, useState } from 'react';

import { UserContext } from '..';

export const UserProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<Server.User | null>(null);
  const [spotifyProfile, setSpotifyProfile] = useState<Spotify.Profile | null>(
    null
  );
  const [spotifyTokenInfo, setSpotifyTokenInfo] =
    useState<Spotify.TokenInfo | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        spotifyProfile,
        spotifyTokenInfo,
        setUser,
        setSpotifyProfile,
        setSpotifyTokenInfo,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
