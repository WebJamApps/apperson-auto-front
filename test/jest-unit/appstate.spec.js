
import { AppState } from '../../src/classes/AppState';


describe('the AppState module tests', () => {
  const appState = new AppState();

  test('test the user', () => {
    expect(typeof appState.getUser()).toBe('object');
  });
});
