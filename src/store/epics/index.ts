import { combineEpics } from 'redux-observable';

import * as appEpics from './app';

export const rootEpic = combineEpics(...Object.values({ ...appEpics }));
