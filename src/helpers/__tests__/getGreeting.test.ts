import getGreeting from '../getGreeting';

describe('getGreeting', () => {
  test('should return 早安 between 5 and 11', () => {
    // Arrange
    jest.spyOn(Date.prototype, 'getHours').mockReturnValue(8);

    // Act
    const result = getGreeting();

    // Assert
    expect(result).toBe('早安');
  });

  test('should return 午安 between 12 and 17', () => {
    // Arrange
    jest.spyOn(Date.prototype, 'getHours').mockReturnValue(14);

    // Act
    const result = getGreeting();

    // Assert
    expect(result).toBe('午安');
  });

  test('should return 晚安 between 18 and 4', () => {
    // Arrange
    jest.spyOn(Date.prototype, 'getHours').mockReturnValue(22);

    // Act
    const result = getGreeting();

    // Assert
    expect(result).toBe('晚安');
  });
});
