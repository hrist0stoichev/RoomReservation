import makeActionCreator from './makeActionCreator';

const ACTION = 'ACTION';

export const action = makeActionCreator(ACTION, 'payload');
