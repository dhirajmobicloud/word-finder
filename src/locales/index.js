import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { loadStorage } from '../helpers'
import en from './en.json'
import ua from './ua.json'
import cs from './cs.json'
import de from './de.json'
import el from './el.json'
import es from './es.json'
import fr from './fr.json'
import id from './id.json'
import ie from './ie.json'
import it from './it.json'
import nl from './nl.json'
import ph from './ph.json'
import pl from './pl.json'
import pt from './pt.json'
import sv from './sv.json'
import tr from './tr.json'

i18n.use(initReactI18next).init({
  resources: { en, ua, cs, de, el, es, fr, id, ie, it, nl, ph, pl, pt, sv, tr },
  fallbackLng: loadStorage('persist:root')?.language.replaceAll('"', '') || 'en',
  debug: false
})

export default i18n
