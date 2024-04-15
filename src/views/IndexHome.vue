<template>
  <el-container>
    <el-header>
      <Nanigation ref="Nanigations" @opendetail="opendetail" />
    </el-header>
    <el-main :style="isMobile() ? { marginTop: '-15px' } : { marginTop: '-10px' }">
      <router-view></router-view>
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
    <TreeList v-if="isMobile()" ref="SearchTree" @closedetail="closedetail" @openlist="openlist" :show="data.show"
      :treelist="data.movietypeList" />
  </el-container>
</template>

<script setup lang="ts">
import { isMobile } from "../utils/isMobil";
import Header from "../components/index/Header.vue";
import Footer from "../components/index/Footer.vue";
import Nanigation from "../components/Navigation/Navigation.vue";
import TreeList from "../components/TreeList/index.vue";
import { globalEvent } from '../utils/globalEvent';
import { reactive, computed, onMounted, ref, } from "vue";
import { useStore, mapMutations } from 'vuex';
const store = useStore();
const data = reactive({
  currentIndex: null,
  indexNmae: "",
  value: '',
  show: false,
  limit: 10,
  page: 1,
  menulist: ["Asia", "India", "Japanese", "Occident", "Cartoon", "Taiwan", "Sri Lankan"],
  movietypeList: computed(() => store.state.movietypeList.map((item, index) => {
    if (item.children) {
      return {
        name: item.name,
        show: item.show,
        open: false,
        subMenus: item.children.length < 8 ? item.children : item.children.slice(0, 8),
      }
    } else {
      return []
    }
  })),
})

const Searcha = ref(null);
const Nanigations = ref(null);
const SearchTree = ref(null);

const handSearch = () => {
  //执行搜索逻辑
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
})
const filterList = (info, index) => {
  if ((data.currentIndex === 0 || data.currentIndex) && data.indexNmae && info.name == data.indexNmae) {
    data.currentIndex = null
    data.indexNmae = ""
    info.type = 0
  } else {
    info.type = 2
    data.currentIndex = index
    data.indexNmae = info.name
  }
  store.dispatch('gelMoveiList', { category_id: info.id, limit: data.limit, page: data.page, type: info.type });
}
const opendetail = (e) => {
  setTimeout(() => {
    data.show = !data.show
  }, 300);
 
  if (data.show) {
    // 添加点击外部关闭的事件监听器
    document.addEventListener('click', closeDivOutside);
  } else {
    // 移除事件监听器
    document.removeEventListener('click', closeDivOutside);
  }
}
const handleClickOutside = () => {
  if (Searcha.value && !Searcha.value.$el.contains(event.target) && !Nanigations.value.$el.children[1].contains(event.target)) {
    store.commit('setSearch', false)
    console.log(Nanigations.value.$el.children[1].contains(event.target));
  }
}

const closedetail = (type) => {
  setTimeout(() => {
    data.show = type
  }, 100);
  //通知home组件发生了点击事件
  globalEvent.emit('button-clicked');
  
}
const openlist = (index) => {

}

const closeDivOutside = (event) => {
  // 检查点击的位置是否在指定的 div 外部
  console.log('SearchTree.value: ', SearchTree);
  if (!SearchTree.value.$el.contains(event.target)) {
    data.show = false;
    // 移除事件监听器
    document.removeEventListener('click', closeDivOutside);
  }
}


// 映射state
const isSearch = computed(() => store.state.Search);

</script>


<style scoped lang="less">
.menu_list {
  width: 200px;
  min-height: 180px;
  background-color: rgb(68, 89, 126);
  position: fixed;
  right: 10px;
  top: 50px;
  border-radius: 7px;
  color: #fff;
  text-align: left;

  .menu_list_item {
    width: 100%;
    height: 40px;
    padding-left: 10px;
    line-height: 40px;
  }

  .active {

    background-color: #ccc;
  }
}

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
