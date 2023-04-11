export const USER_LOGIN = 'USER_LOGIN';
export const COUNT_SCORE = 'COUNT_SCORE';
export const CLEAR_SCORE = 'CLEAR_SCORE';

export const actionUserLogin = (value) => ({ type: USER_LOGIN, value });

export const actionCountScore = (value) => ({ type: COUNT_SCORE, value });

export const cleanCountScore = () => ({ type: CLEAR_SCORE });
