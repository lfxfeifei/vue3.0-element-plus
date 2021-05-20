import Vue from 'vue'
// import DatePicker from 'element/lib/date-picker'
import App from "../App.vue";
import { createApp } from 'vue'
// import VueI18n from 'vue-i18n'
import  { createI18n } from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-plus/lib/locale/lang/en' // element-plus lang
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'// element-plus lang
import elementEsLocale from 'element-plus/lib/locale/lang/es'// element-ui lang
import ElementLocale from 'element-plus/lib/locale'

import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'
// createApp(App).use(VueI18n)
// Vue.use(DatePicker)
const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  es: {
    ...esLocale,
    ...elementEsLocale
  }
}

const i18n: any = createI18n({
  // set locale
  // options: en | zh | es
  locale: Cookies.get('language') || 'en',
  // set locale messages
  messages
})
export default i18n
