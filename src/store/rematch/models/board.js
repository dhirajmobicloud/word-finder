import dictionary from '../../../dictionary'
import { getRandomWord } from '../../../helpers'

const init = {
  letters: [],
  wordLength: 5,
  row: 1,
  answer: localStorage.getItem('persist:root') ? '' : getRandomWord(dictionary.en1, 5),
  otherWords:[],


}

export const board = {
  state: init,
  reducers: {
    reset(state) {
      return { ...init, wordLength: state.wordLength }
    },

    newAnswer(state, language) {
      state.answer = getRandomWord(dictionary[language], state.wordLength)
    },

    setWordLength(state, count) {
      state.wordLength = count
    },

    addLetter(state, payload) {
      state.letters.push({ letter: payload.letter, status: payload.status ?? 'unknown' })
    },

    backspace(state) {
      state.letters.pop()
    },
AddOtherWords(state,values)
    {
      if(state.otherWords.includes(values)===false)
      {
      state.otherWords.push(values);
      }
  },
  removeWords(state,value)
  {
   state.otherWords= state.otherWords.filter((values)=>values!==value);
  },

  AddData(state,values,index)
    {
      
     state.otherWords[index]=values;
  },

   
  

    addWord(state, newWord) {
      for (let i = 0; i < state.wordLength; i++) {
        const currentIndex = (state.row - 1) * state.wordLength + i

        state.letters[currentIndex].status = newWord.correct[i]
          ? 'correct'
          : newWord.present[i]
          ? 'present'
          : 'absent'
      }

      state.row += 1
    }
  }
}
