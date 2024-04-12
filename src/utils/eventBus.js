// eventBus.js

import { createApp } from 'vue';

// 创建一个新的 Vue 应用实例作为事件总线
const app = createApp({});
export const eventBus = app.config.globalProperties.$eventBus = app;
