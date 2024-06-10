import { init } from '@rematch/core'
import immerPlugin from '@rematch/immer'
import persistPlugin from '@rematch/persist'
import storage from 'redux-persist/lib/storage'
import { board } from './models/board.js'
import { themes } from './models/themes.js'
import { popups } from './models/popups.js'
import { statistics } from './models/statistics.js'
import { hints } from './models/hints.js'
import { language } from './models/language.js';
import { points } from './models/points.js'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['popups']
}

export const store = init({
  models: { board, themes, popups, statistics, language, hints,points },
  plugins: [immerPlugin(), persistPlugin(persistConfig)]
})
