import { chunk } from '../helpers'

export const prices = {
  seconds:0,
  minutes:5,
  win: 25, // win coeficient
  wp: 0,
  hints: {
    correct: 10,
    absent: 5
  },
  gamingId:'Wordsie@007'


}

export const languages = [
  { value: 'en', label: 'English' },
  {value:'en1', label:'English'},
 
]

export const keyboards = {
  en: {
    alpha: 'qwertyuiopasdfghjklzxcvbnm',
    get kb() {
      return chunk(this.alpha, [10, 9, 7])
    }
  },
  en1: {
    alpha: 'qwertyuiopasdfghjklzxcvbnm',
    get kb() {
      return chunk(this.alpha, [10, 9, 7])
    }
  },
 
}
