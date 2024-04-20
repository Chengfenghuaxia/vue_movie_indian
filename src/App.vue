<template>
  <el-config-provider :locale="zhCn" style="">
    <div class="main">
      <router-view></router-view>
      <!-- <Util/> -->
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
import Util from "./components/index/Util.vue";
import zhCn from 'element-plus/es/locale/lang/zh-cn' // 更新引入路径
import { onMounted } from "vue";
import { useStore } from 'vuex';
const store = useStore();


const triggerAction = () => {
  store.dispatch('getmovietypeList', {});
  store.dispatch('gelMoveiList', { limit: 12, page: 1, type: 0 });
  store.dispatch('getadvertiseList', { type: -1 });
};


onMounted(() => {
  triggerAction()
  setTimeout(() => {
    store.dispatch('gelTopMoveiList', { limit: 12, page: 1, type: 3 });
  }, 1000);
  let lang = localStorage.getItem('MVlang')
  if (!lang) {
    localStorage.setItem('MVlang', 'hi')
  }
})

</script>

<style>
html,
body,
#app {
  width: 100%;
  margin: 0;
  padding: 0;
}

/*背景色切换*/
#app,
.main {
  max-width: 100%;
  min-height: 100vh;
  color: rgb(221, 221, 221);
  /* background: white; */
  background: #000;


}

* {
  box-sizing: border-box;
}

/*全局a标签默认样式去除*/
a {
  outline: none;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.38);
}

a:hover {
  color: #888888;
}
</style>
<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>