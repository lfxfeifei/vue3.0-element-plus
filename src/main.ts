import { createApp } from "vue";
import Cookies from 'js-cookie'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Bmob, { globalPlugins } from "./plugins/global";
import { elementPlus } from "./plugins/elementPlus";
import '@/permission';
import '@/mock/index.js';
import locale from 'element-plus/lib/locale'
import i18n from '@/lang' // Internationalization

import 'element-plus/lib/theme-chalk/index.css'
import '@/styles/index.scss'

// import "./assets/style/reset.scss";
// import "./assets/style/global.less";
const app = createApp(App);
locale.use((key: any, value: any): any => i18n.t(key, value))

app.config.globalProperties.$ELEMENT = {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key: any, value: any) => i18n.t(key, value)
}

app.config.globalProperties.$bmob = Bmob;
app
  .use(i18n)
  .use(elementPlus)
  .use(store)
  .use(router)
  .use(globalPlugins)
  .mount("#app");
