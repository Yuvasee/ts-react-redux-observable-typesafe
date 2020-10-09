import { ActionType } from 'typesafe-actions';

import * as apiActions from './api';
import * as appActions from './app';

export type RootAction = ActionType<typeof apiActions | typeof appActions>;
