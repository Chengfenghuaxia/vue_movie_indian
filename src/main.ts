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
// 使用自定义loading


const app = createApp(App)
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


