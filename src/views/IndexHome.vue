<template>
  <el-container>
    <el-header>
      <Nanigation ref="Nanigations" />
    </el-header>
    <el-main :style="isMobile() ? { marginTop: '-15px' } : { marginTop: '-10px' }">
      <router-view></router-view>
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { isMobile } from "../utils/isMobil";
import Header from "../components/index/Header.vue";
import Footer from "../components/index/Footer.vue";
import Nanigation from "../components/Navigation/Navigation.vue";
import { reactive, computed, onMounted, ref } from "vue";
import { useStore, mapMutations } from 'vuex';
const data = reactive({
  value: '',
})
const store = useStore();
const Searcha = ref(null);
const Nanigations = ref(null);
const handSearch = () => {
  //执行搜索逻辑
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
console.log(isMobile());

})

const handleClickOutside = () => {
  if (Searcha.value&&!Searcha.value.$el.contains(event.target) && !Nanigations.value.$el.children[1].contains(event.target)) {
    store.commit('setSearch', false)
    console.log(Nanigations.value.$el.children[1].contains(event.target));
    
  }
}

// 映射state
const isSearch = computed(() => store.state.Search);

</script>


<style scoped>
:deep(.el-main) {
  padding-top: 70px !important;
  padding-bottom: 30px !important;
  min-height: 85vh;
}

:deep(.el-header) {
  padding: 0 !important;
  position: fixed !important;
  width: 100% !important;
  min-height: 60px;
  transform: translateZ(0);
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.85);
  top: 0;
}


@media (min-width: 768px) {
  .el-main {
    margin: 0 auto;
    padding: 100px 0;
    /*padding-top: 100px!important;*/
  }
}

@media (max-width: 768px) {
  .el-main {
    /*margin: 0 auto;*/
    padding: 55px 0 !important;
    /*padding-top: 100px!important;*/
  }

  :deep(.el-header) {
    height: 40px !important;
    min-height: 40px !important;
  }
}

:deep(.el-menu--horizontal) {
  border-bottom: 1px solid rgb(46, 46, 46);
}

/*@media (min-width: 768px){ //>=768的设备 }*/
/*@media (min-width: 992px){ //>=992的设备 }*/
/*@media (min-width: 1200){ //>=1200的设备 }*/

@media (min-width: 1024px) {
  .el-main {
    width: 1023px
  }
}

@media (min-width: 990px) {
  .el-main {
    width: 970px
  }
}

@media (min-width: 1200px) {
  .el-main {
    width: 1180px
  }
}

@media (min-width: 1400px) {
  .el-main {
    width: 1400px
  }
}

@media (min-width: 1560px) {
  .el-main {
    width: 1500px
  }
}
</style>
