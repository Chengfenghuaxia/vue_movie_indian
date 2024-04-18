<template>
  <div class="container">
    <!-- <Tabs @selectTab="getTabsValue" /> -->
    <!-- <TopNav @tagClicked="setScrollTop" /> -->
    <Advertising :advertiseList="data.advertiseList" @getadheight="getadheight" />

    <div class="search_dom" :style="data.advertiseList.length > 0 ? {} : { height: '14rem' }">
      <h2> <span>{{$t('placeSearch')}}</span></h2>
      <div class="search_group">
        <input v-model="data.value" @keydown="e => { e.keyCode == 13 && searchMovie(data.value) }"
          :placeholder="$t('placeholder')" class="search" />
        <el-button @click="searchMovie(data.value)" :icon="Search" style="" />

      </div>
    </div>

    <div class="HotMovie" v-if="data.Homepage.length != 0">Premium video</div>
    <Playlist :MovieList="data.Homepage" @getMVdata="getMVdata" ref="gerHeight" @updateHeight="getHeight" />
    <!-- <div class="HotMovie">{{ data.lang.class }}</div> -->
    <!-- <ClassNav :movietypeList="data.movietypeList" @getMVdetail="getMVdetail" /> -->
    <!-- <div class="HotMovie">{{ data.lang.hot_movie }}</div> -->
    <!-- 热门视频 -->
    <Playlist :MovieList="data.Hvideolist" @getMVdata="getMVdata" />
    <!-- <HotVideos @ChangeHotvideo="handTohotMovie" :HotVideoList="data.Hvideolist" @getMoviedata="getMoviedata" /> -->
    <el-pagination @current-change="handleCurrentChange" :style="{ float: 'right', right: '3.125rem' }"
      :page-size="data.limit" layout="prev, pager, next" :total="data.total" v-model:current-page="data.currentPage" />
     
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed, ref, nextTick, watch } from "vue";
import { useRouter } from 'vue-router';
import { ApiPost } from "../../utils/request";
import { globalEvent } from '../../utils/globalEvent';
import { isMobile } from "../../utils/isMobil";
import Tabs from "../../components/Tabs/Tabs.vue";
import TopNav from "../../components/TopNav/index.vue";
import Advertising from "../../components/Advertising/index.vue";
import ClassNav from "../../components/ClassNav/index.vue";
import HotVideos from "../../components/HotVideos/HotVideos.vue";
import Playlist from "../../components/Playlist/index.vue";
import { en } from '../../config/config';
import { useStore } from 'vuex';
import { Search } from '@element-plus/icons-vue'
const store = useStore();
const router = useRouter();

watch(
  () => router.currentRoute,
  (to, from) => {
    console.log('路由从', from, '变为', to);
    // 在这里执行相应的操作，例如更新组件数据等
  }
);


const data = reactive({
  value: "",
  lang: en,
  limit: 12,
  page: 1,
  currentPage: 1,
  pageSize: 5,
  MovieType: 0,  // 0全部 1地区分类 2 类型分类
  total: computed(() => store.state.MovieTotal),
  form: {
    type: -1
  },
  advertiseList: computed(() => store.state.advertiseList.filter(item => item.type == 1 && item.jump_type == 2)),
  movietypeList: computed(() => store.state.movietypeList.map((item, index) => {
    if (item.children) {
      return {
        title: item.name,
        show: item.show,
        list: item.children.length < 8 ? item.children : item.children.slice(0, 8),
      }
    } else {
      return []
    }
  })),
  Hvideolist: computed(() => store.state.MovieList),
  isMobile: isMobile(),
  Homepage: computed(() => store.state.TopMovieList),
  ClassHeight: 130,
  BestVideos: 60
})
const gerHeight = ref(null);
const searchMovie = (val?) => {
  console.log(val, '有多年广西吗');
  router.push({ path: '/search', query: { search: val } });
}
const getTabsValue = async (value) => {
  store.dispatch('gelMoveiList', { area_id: value.id, limit: data.limit, page: data.page, type: value.name == 'ALL' ? 0 : 1 });
}
const changePage = (page: number) => {
  console.log(page);
}
const onSearch = (val) => {
  console.log(val, '有多年广西吗');

  router.push({ path: '/search', query: { search: val } });
};
const onCancel = () => {
  console.log('取消');

};
const handTohotMovie = async (e) => {
  let res = await ApiPost('/movie/getmovieinfo', { id: e.id })
  let data = {
    query: e,
    movieinfo: (res as any).data
  }
  router.push({ path: '/play' });
  store.commit('setMovieInfo', data)
}
const getMVdetail = async (info) => {
  data.currentPage = 1
  data.MovieType = 2
  data.page = 1
  localStorage.setItem('category_id', info.id)
  store.dispatch('gelMoveiList', { category_id: info.id, limit: data.limit, page: data.page, type: info.type });
}
const getMoviedata = (data) => {
  console.log(data);
}
const getMVdata = async (e) => {
  let res = await ApiPost('/movie/getmovieinfo', { id: e.id })
  let data = {
    query: e,
    movieinfo: (res as any).data
  }
  router.push({ path: '/play' });
  store.commit('setMovieInfo', data)
}
const handeChange = (page: number) => {
  let category_id = localStorage.getItem('category_id')
  data.currentPage = page
  store.dispatch('gelMoveiList', { category_id: category_id, limit: data.limit, page: page, type: data.MovieType });
  window.scrollTo(0, 1400);
}
const handleCurrentChange = (page: number) => {
  let category_id = localStorage.getItem('category_id')
  data.currentPage = page
  //如果是通过点击树形空间进行筛选，则让分页改为1，高亮同步
  store.dispatch('gelMoveiList', { category_id: category_id, limit: data.limit, page: page, type: category_id ? 2 : data.MovieType });
  window.scrollTo(0, 1400);
}
const setScrollTop = (row) => {
  if (row.label == "Categories") {
    window.scrollTo(0, data.ClassHeight);
  } else if (row.label == "Best videos") {
    window.scrollTo(0, data.BestVideos);
  }
}
const getHeight = (H) => {
  data.ClassHeight += H
}
const getadheight = (H) => {
  data.ClassHeight += H
  data.BestVideos += H
}
onMounted(() => {
  // store.dispatch('gelMoveiList', { limit: data.limit, page: data.page, type: 0 });
  globalEvent.on('button-clicked', () => {
    data.currentPage = 1
  });

})
</script>
<!--移动端修改-->
<style scoped>
@import "/src/assets/css/pagination.css";

.HotMovie {
  text-align: left;
  padding: .625rem .625rem 0rem .625rem;
  font-weight: bold;
  width: 100%;
  /* border-bottom: .0625rem solid #ba7405; */
  color: #fff;
  margin-top: -30px;
}
</style>
<style scoped lang="less">
:root {
  --pagination-active-color: #ba7405;
}

/* 覆盖Element UI分页器当前选中页码的背景颜色 */
::v-deep {
  .el-pagination .el-pager .is-active {
    background-color: var(--pagination-active-color) !important;
    border-color: var(--pagination-active-color) !important;
  }
}

// PC端
@media (min-width: 48rem) {
  .cus_content_item {
    padding: .625rem;
    overflow: hidden;
    /*margin-bottom: .625rem;*/
  }

  .search_dom {
    height: 14rem;
    // margin: 3rem 0 3rem 0;
    overflow: hidden;
    // background-color: #73b5cf70;
    // color: #fe628e;
    font-family: 'Courier New', Courier, monospace;
    font-size: 20px;
    font-weight: bold;
  }

  .search_group {
    width: 80%;
    margin: 0 auto;
    display: flex;
    margin-top: 30px;
  }

  .search {
    flex: 10;
    background-color: #2e2e2e !important;
    border: none !important;
    height: 60px;
    border-radius: 6px 0 0 6px;
    padding-left: 20px;
    color: #c9c4c4;
    font-size: 20px;
    font-weight: bold;
  }

  .search:focus {
    outline: none;
  }

  .search_group button {
    flex: 1;
    margin: 0;
    background-color: #2e2e2e;
    color: rgba(155, 73, 231, 0.72);
    border: none !important;
    height: 60px;
    border-radius: 0 6px 6px 0;
    font-size: 20px;
  }




  .search::placeholder {
    font-size: 15px;
    color: #999999;
  }


}

// 移动端
@media (max-width: 48rem) {
  .search_group {
    width: 90%;
    margin: 0 auto;
    display: flex;
    margin-top: 30px;
  }

  .search {
    flex: 10;
    background-color: #2e2e2e !important;
    border: none !important;
    height: 40px;
    border-radius: 6px 0 0 6px;
    padding-left: 20px;
    color: #c9c4c4;
    font-size: 15px;
    font-weight: bold;
  }

  .search:focus {
    outline: none;
  }

  .search_group button {
    flex: 1;
    margin: 0;
    background-color: #2e2e2e;
    color: rgba(155, 73, 231, 0.72);
    border: none !important;
    height: 40px;
    border-radius: 0 6px 6px 0;
    font-size: 20px;
  }




  .search::placeholder {
    font-size: 15px;
    color: #999999;
  }

  .search_dom {
    // height: 14rem;
    // margin: 3rem 0 3rem 0;
    overflow: hidden;
    // background-color: #73b5cf70;


  }



  .cus_content_item {
    padding: 0 .375rem 0 0;
    margin-bottom: .625rem;
    overflow: hidden;
  }

  .nav_ul {
    justify-content: end;
  }
}
</style>