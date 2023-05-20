import {
  axiosInstance,
  getEpisodes,
  getProfile,
  getShowEpisodes,
  getShows,
  searchShows,
} from '../spotify';

describe('getProfile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the user profile', async () => {
    // Arrange
    const profile = {
      country: 'US',
      display_name: 'John Doe',
      email: 'john.doe@example.com',
      explicit_content: {
        filter_enabled: true,
        filter_locked: false,
      },
      external_urls: {
        spotify: 'https://example.com',
      },
      followers: {
        href: 'https://example.com/followers',
        total: 1000,
      },
      href: 'https://example.com/profile',
      id: '12345',
      images: [
        {
          url: 'https://example.com/image.jpg',
          height: 200,
          width: 200,
        },
      ],
      product: 'premium',
      type: 'user',
      uri: 'spotify:user:12345',
    };
    const mockResponse = { data: profile };
    axiosInstance.get = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await getProfile();

    // Assert
    expect(result).toEqual(profile);
    expect(axiosInstance.get).toHaveBeenCalledWith('/me');
  });
});

describe('searchShows', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const expectedResponse = {
    shows: {
      href: 'https://api.spotify.com/v1/search?q=encodeURIComponent(artist:keyword)&type=show&market=TW&limit=12',
      limit: 12,
      next: null,
      offset: 0,
      previous: null,
      total: 0,
      items: [],
    },
  };
  const mockResponse = { data: expectedResponse };

  it('should fetch search results correctly', async () => {
    // Arrange
    axiosInstance.get = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await searchShows({ keyword: 'keyword', country: 'TW' });

    // Assert
    expect(result).toEqual(expectedResponse);
    expect(axiosInstance.get).toHaveBeenCalledWith('/search', {
      params: {
        q: 'encodeURIComponent(artist:keyword)',
        type: 'show',
        market: 'TW',
        limit: 12,
      },
    });
  });

  it('should use default country if not provided', async () => {
    // Arrange
    axiosInstance.get = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await searchShows({ keyword: 'keyword' });

    // Assert
    expect(result).toEqual(expectedResponse);
    expect(axiosInstance.get).toHaveBeenCalledWith('/search', {
      params: {
        q: 'encodeURIComponent(artist:keyword)',
        type: 'show',
        market: 'TW',
        limit: 12,
      },
    });
  });
});

describe('getShows', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch multiple shows correctly', async () => {
    // Arrange
    const expectedResponse = {
      shows: [
        {
          id: 'show1',
          name: 'Show 1',
        },
        {
          id: 'show2',
          name: 'Show 2',
        },
      ],
    };
    const mockResponse = { data: expectedResponse };
    axiosInstance.get = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await getShows({ ids: 'show1,show2', country: 'TW' });

    // Assert
    expect(result).toEqual(expectedResponse);
    expect(axiosInstance.get).toHaveBeenCalledWith(
      '/shows?market=TW&ids=show1,show2'
    );
  });
});

describe('getShowEpisodes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const expectedResponse = {
    items: [
      {
        id: 'episode1',
        name: 'Episode 1',
      },
      {
        id: 'episode2',
        name: 'Episode 2',
      },
    ],
    total: 2,
    limit: 10,
    offset: 0,
    next: null,
    previous: null,
    href: '/shows/show1/episodes',
  };

  const mockResponse = { data: expectedResponse };

  it('should fetch show episodes correctly', async () => {
    // Arrange
    axiosInstance.get = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await getShowEpisodes({ id: 'show1', offset: 0 });

    // Assert
    expect(result).toEqual(expectedResponse);
    expect(axiosInstance.get).toHaveBeenCalledWith('/shows/show1/episodes', {
      params: { offset: 0 },
    });
  });

  it('should use default offset if not provided', async () => {
    // Arrange
    axiosInstance.get = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await getShowEpisodes({ id: 'show1' });

    // Assert
    expect(result).toEqual(expectedResponse);
    expect(axiosInstance.get).toHaveBeenCalledWith('/shows/show1/episodes', {
      params: { offset: 0 },
    });
  });
});

describe('getEpisodes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const expectedResponse = {
    episodes: [
      {
        id: 'episode1',
        name: 'Episode 1',
      },
      {
        id: 'episode2',
        name: 'Episode 2',
      },
    ],
  };

  const mockResponse = { data: expectedResponse };

  it('should fetch episodes correctly', async () => {
    // Arrange
    axiosInstance.get = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await getEpisodes({
      ids: 'episode1,episode2',
      country: 'TW',
    });

    // Assert
    expect(result).toEqual(expectedResponse);
    expect(axiosInstance.get).toHaveBeenCalledWith(
      '/episodes?market=TW&ids=episode1,episode2'
    );
  });

  it('should use default country if not provided', async () => {
    // Arrange
    axiosInstance.get = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await getEpisodes({ ids: 'episode1,episode2' });

    expect(axiosInstance.get).toHaveBeenCalledWith(
      '/episodes?market=TW&ids=episode1,episode2'
    );
    expect(result).toEqual(expectedResponse);
  });
});
