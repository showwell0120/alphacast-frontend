declare namespace Server {
  interface User {
    id: string | null;
    token: string | null;
    favoriteEpisodeIds?: Favorite[] | null;
  }

  interface Category {
    id: string;
    name: string;
    savedShows: { id: string }[];
  }

  interface Categories {
    categories: Category[];
  }

  interface SuccessResponse {
    success: boolean;
  }

  interface Favorite {
    id: string;
  }
}
