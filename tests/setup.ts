jest.mock('react-native', () => ({
  Platform: {
    select: jest.fn(),
  }
}));