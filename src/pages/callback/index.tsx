import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import { useCallback, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

import { injectAuthHeader } from '../../apis/axiosCreator';
import {
  initializeUser,
  axiosInstance as serverAxios,
} from '../../apis/server';
import {
  getTokenInfo,
  axiosInstance as spotifyAxios,
} from '../../apis/spotify';
import { getProfile } from '../../apis/spotify';
import { flexColCenter } from '../../bootstrap/classnames';
import {
  useCategoryContext,
  useFavoriteContext,
  useUserContext,
} from '../../contexts';
import styles from './styles.module.scss';

export function Callback() {
  const { setSpotifyTokenInfo, setUser, setSpotifyProfile } = useUserContext();
  const { setFavoriteEpisodeIds } = useFavoriteContext();
  const { syncCategoriesMutation, syncCategories } = useCategoryContext();

  const navigate = useNavigate();

  const _fetchTokenInfo = useMutation({ mutationFn: getTokenInfo });
  const _fetchProfile = useMutation({ mutationFn: getProfile });
  const _fetchUser = useMutation({ mutationFn: initializeUser });

  // error handling: fallback rendering
  if (_fetchTokenInfo.isError) {
    throw _fetchTokenInfo.error;
  }
  if (_fetchProfile.isError) {
    throw _fetchProfile.error;
  }
  if (_fetchUser.isError) {
    throw _fetchUser.error;
  }

  const allSuccess =
    _fetchTokenInfo.isSuccess &&
    _fetchProfile.isSuccess &&
    _fetchUser.isSuccess &&
    syncCategoriesMutation?.isSuccess;

  const initializeUserData = useCallback(
    async (code: string) => {
      // 取得 spotify token
      _fetchTokenInfo.mutate(code, {
        onSuccess: data => {
          setSpotifyTokenInfo(data);

          // 將 token 注入 headers
          injectAuthHeader(spotifyAxios, data.access_token);

          // 取得 spotify 上的個人 profile
          _fetchProfile.mutate(undefined, {
            onSuccess(data) {
              setSpotifyProfile(data);
            },
          });

          // 取得使用者資訊
          _fetchUser.mutate(data.access_token, {
            onSuccess(data) {
              const { id, token } = data;
              setUser({ id, token });

              data?.favoriteEpisodeIds?.length &&
                setFavoriteEpisodeIds(data?.favoriteEpisodeIds);

              // 將 token 注入 headers
              injectAuthHeader(serverAxios, data.token);

              // 取得分類
              syncCategories();
            },
          });
        },
      });
    },
    [
      _fetchProfile,
      _fetchTokenInfo,
      _fetchUser,
      setFavoriteEpisodeIds,
      setSpotifyProfile,
      setSpotifyTokenInfo,
      setUser,
      syncCategories,
    ]
  );

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (allSuccess) {
      timer = setTimeout(() => {
        navigate('/main');
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [allSuccess, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    code && initializeUserData(code);
  }, [initializeUserData]);

  return (
    <div className={classNames(flexColCenter, styles['container'])}>
      <div className={styles['spinners']}>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
      </div>
      {(_fetchTokenInfo.isLoading || _fetchProfile.isLoading) && (
        <p>正在取得您在 Spotify 的個人資訊 ...</p>
      )}
      {(_fetchUser.isLoading || syncCategoriesMutation?.isLoading) && (
        <p>正在取得您的個人化 Podcast 資料 ...</p>
      )}
      {allSuccess && <p>一切都好了，將重導至播放頁面！</p>}
    </div>
  );
}
