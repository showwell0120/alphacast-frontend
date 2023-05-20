import {
  addFavorite,
  addShow,
  axiosInstance,
  createCategory,
  deleteCategory,
  deleteShow,
  getCategories,
  getUser,
  initializeUser,
  removeFavorite,
  updateCategory,
} from '../server';

describe('getUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch user data', async () => {
    // Arrange
    const user = {
      id: '123',
      token: 'abc',
    };
    const mockResponse = { data: user };
    axiosInstance.post = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await getUser();

    // Assert
    expect(result).toEqual(user);
    expect(axiosInstance.post).toHaveBeenCalledWith('/me');
  });
});

describe('initializeUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize user data', async () => {
    // Arrange
    const user = {
      id: '123',
      token: 'abc',
      favoriteEpisodeIds: [{ id: 1, title: 'Episode 1' }],
    };
    const mockResponse = { data: user };
    axiosInstance.post = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await initializeUser('spotify_token');

    // Assert
    expect(result).toEqual(user);
    expect(axiosInstance.post).toHaveBeenCalledWith('/users', {
      spotifyToken: 'spotify_token',
    });
  });
});

describe('getCategories', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch categories', async () => {
    // Arrange
    const categories = {
      categories: [
        {
          id: '1',
          name: 'Category 1',
          savedShows: [{ id: '1' }, { id: '2' }],
        },
        {
          id: '2',
          name: 'Category 2',
          savedShows: [{ id: '3' }, { id: '4' }],
        },
      ],
    };
    const mockResponse = { data: categories };
    axiosInstance.get = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await getCategories();

    // Assert
    expect(result).toEqual(categories);
    expect(axiosInstance.get).toHaveBeenCalledWith('/categories');
  });
});

describe('createCategory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a category', async () => {
    // Arrange
    const categoryName = 'Category 1';
    const successResponse = { success: true };
    const mockResponse = { data: successResponse };
    axiosInstance.post = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await createCategory(categoryName);

    // Assert
    expect(result).toEqual(successResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith('/categories', {
      name: categoryName,
    });
  });
});

describe('updateCategory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a category', async () => {
    // Arrange
    const categoryId = '12345';
    const categoryName = 'Updated Category';
    const successResponse = { success: true };
    const mockResponse = { data: successResponse };
    axiosInstance.put = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await updateCategory({ id: categoryId, name: categoryName });

    // Assert
    expect(result).toEqual(successResponse);
    expect(axiosInstance.put).toHaveBeenCalledWith(
      `/categories/${categoryId}`,
      { name: categoryName }
    );
  });
});

describe('deleteCategory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a category', async () => {
    // Arrange
    const categoryId = '12345';
    const successResponse = { success: true };
    const mockResponse = { data: successResponse };
    axiosInstance.delete = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await deleteCategory(categoryId);

    // Assert
    expect(result).toEqual(successResponse);
    expect(axiosInstance.delete).toHaveBeenCalledWith(
      `/categories/${categoryId}`
    );
  });
});

describe('addShow', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a show to a category', async () => {
    // Arrange
    const categoryId = '12345';
    const showId = '67890';
    const successResponse = { success: true };
    const mockResponse = { data: successResponse };
    axiosInstance.post = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await addShow({ categoryId, showId });

    // Assert
    expect(result).toEqual(successResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith(
      `/categories/${categoryId}/shows`,
      { showId }
    );
  });
});

describe('deleteShow', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a show from a category', async () => {
    // Arrange
    const categoryId = '12345';
    const showId = '67890';
    const successResponse = { success: true };
    const mockResponse = { data: successResponse };
    axiosInstance.delete = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await deleteShow({ categoryId, showId });

    // Assert
    expect(result).toEqual(successResponse);
    expect(axiosInstance.delete).toHaveBeenCalledWith(
      `/categories/${categoryId}/shows/${showId}`
    );
  });
});

describe('addFavorite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a favorite episode', async () => {
    // Arrange
    const episodeId = '12345';
    const successResponse = { success: true };
    const mockResponse = { data: successResponse };
    axiosInstance.post = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await addFavorite(episodeId);

    // Assert
    expect(result).toEqual(successResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith('/episodes', { episodeId });
  });
});

describe('removeFavorite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should remove a favorite episode', async () => {
    // Arrange
    const episodeId = '12345';
    const successResponse = { success: true };
    const mockResponse = { data: successResponse };
    axiosInstance.delete = jest.fn().mockResolvedValue(mockResponse);

    // Act
    const result = await removeFavorite(episodeId);

    // Assert
    expect(result).toEqual(successResponse);
    expect(axiosInstance.delete).toHaveBeenCalledWith(`/episodes/${episodeId}`);
  });
});
