declare namespace Spotify {
  type Images =
    | {
        url: string;
        height: number;
        width: number;
      }[]
    | undefined;

  type ExternalUrls = { spotify: 'string' };

  type ExplicitContent = { filter_enabled: boolean; filter_locked: boolean };

  type Followers = { href: string; total: number };

  type Copyrights = {
    text: string;
    type: string;
  }[];

  type Restrictions = {
    reason: 'string';
  };

  type ResumePoint = {
    fully_played: boolean;
    resume_position_ms: number;
  };

  interface TokenInfo {
    access_token: string | null;
    expires_in: number | null;
    refresh_token: string | null;
    scope: string | null;
    token_type: string | null;
  }

  interface Profile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: ExplicitContent;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Images;
    product: string;
    type: string;
    uri: string;
  }

  interface PaginationData {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  }

  interface ItemCommonProperties {
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Images;
    is_externally_hosted: boolean;
    languages: string[];
    name: string;
    type: 'episode' | 'show';
    uri: string;
  }

  interface Show extends ItemCommonProperties {
    available_markets: string[];
    copyrights: Copyrights;
    media_type: string;
    publisher: string;
    total_episodes: number;
  }

  interface SearchShowResult {
    shows: PaginationData & { items: Show[] };
  }

  interface GetShowResult {
    shows: Show[];
  }

  interface Episode extends ItemCommonProperties {
    audio_preview_url: string;
    duration_ms: number;
    is_playable: boolean;
    language: string;
    release_date: string;
    release_date_precision: string;
    resume_point: ResumePoint;
    restrictions: Restrictions;
  }

  interface ShowEpisodesResult extends PaginationData {
    items: Episode[];
  }

  interface GetEpisodesResult {
    episodes: Array<Episode & { show: Show }>;
  }

  interface EmbedControllerEvents {
    data: {
      isPaused: boolean;
      isBuffering: boolean;
    };
  }
}
