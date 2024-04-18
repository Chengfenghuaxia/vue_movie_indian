import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from "./router/router";
// 引入elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vant from 'vant';
import store from './store';
import VueGtag from "vue-gtag";
import 'vant/lib/index.css';
import 'plyr/dist/plyr.css';// 引入自定义loading样式

import { createI18n } from 'vue-i18n'

import en from './config/en.json'
import zh from './config/zh.json'
let mylan = localStorage.getItem('MVlang')
mylan = mylan == "zh-CN" ? "zh" : mylan
const i18n = createI18n({
  legacy: false,
  locale: mylan, // 默认语言
  fallbackLocale: 'en', // 回退语言
  messages: {
    en,
    zh
  }
})


const app = createApp(App)


app.use(i18n)
app.use(store)
app.use(Vant);
app.use(ElementPlus)
// 引入路由
app.use(router)
app.use(VueGtag, {
  config: { id: "G-JKN25MXMB8" }
}, router);


app.mount('#app')

export default app


