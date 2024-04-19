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
import hi from './config/hi.json'
import tw from './config/tw.json'
let mylan = localStorage.getItem('MVlang')
if(mylan){
  // mylan = mylan == "zh-CN" ? "zh" : mylan
  if(mylan==="zh-CN"){
    mylan = "zh"
  }else if(mylan==="zh-TW"){
    mylan = "tw"
  }
}else{
 
  mylan = navigator.language==="zh-CN"?"zh":navigator.language
}
const i18n = createI18n({
  legacy: false,
  locale: mylan, // 默认语言
  fallbackLocale: 'en', // 回退语言
  messages: {
    en,
    zh,
    hi,
    tw
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


