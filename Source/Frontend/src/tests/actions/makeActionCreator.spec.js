import makeActionCreator from '../../actions/makeActionCreator';

describe('makeActionCreator()', () => {
  it('should create an actionCreater function', () => {
    // Arrange
    const action = makeActionCreator('ACTION', 'payload');

    // Act
    const actionResult = action('x');

    // Assert
    expect(actionResult).toEqual({
      type: 'ACTION',
      payload: 'x'
    });
  })
})