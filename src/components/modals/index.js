import Win from './Win'
import Defeat from './Defeat'
import WordNotFound from './WordNotFound'
import HowToPlay from './HowToPlay'
import Statistics from './Statistics'
import Settings from './Settings'
import Hints from '../modals/Hints';
import Insufficient from './Insufficient';
import DefeatEndPopup from './DefeatEnd';
import WinEndPopup from './WinEnd';
import Exit from './exit'
import Logout from './Logout'

function Modals() {
  return (
    <>
      <Win />
      <Defeat />
      <WordNotFound />
      <HowToPlay />
      <Statistics />
      <Settings />
      <Hints />
      <Insufficient />
      <DefeatEndPopup />
      <WinEndPopup />
      <Exit />
      <Logout />
    </>
  )
}

export default Modals
