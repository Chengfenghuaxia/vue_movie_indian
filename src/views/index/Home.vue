<template>
  <div class="container">
    <!-- <Tabs @selectTab="getTabsValue" /> -->
    <!-- <TopNav @tagClicked="setScrollTop" /> -->
    <Advertising :advertiseList="data.advertiseList" @getadheight="getadheight" />
    <div class="HotMovie" v-if="data.Homepage.length != 0">Premium video</div>
    <Playlist :MovieList="data.Homepage" @getMVdata="getMVdata" ref="gerHeight" @updateHeight="getHeight" />
    <div class="HotMovie">{{ data.lang.class }}</div>
    <!-- <ClassNav :movietypeList="data.movietypeList" @getMVdetail="getMVdetail" /> -->
    <!-- <div class="HotMovie">{{ data.lang.hot_movie }}</div> -->
    <!-- 热门视频 -->
    <Playlist :MovieList="data.Hvideolist" @getMVdata="getMVdata" />
    <!-- <HotVideos @ChangeHotvideo="handTohotMovie" :HotVideoList="data.Hvideolist" @getMoviedata="getMoviedata" /> -->
    <el-pagination @current-change="handleCurrentChange" :style="{ float: 'right', right: '3.125rem' }"
      :page-size="data.limit" :current-page="data.currentPage" layout="prev, pager, next" :total="data.total" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed, ref, nextTick } from "vue";
import { useRouter } from 'vue-router';
import { ApiPost } from "../../utils/request";
import { isMobile } from "../../utils/isMobil";
import Tabs from "../../components/Tabs/Tabs.vue";
import TopNav from "../../components/TopNav/index.vue";
import Advertising from "../../components/Advertising/index.vue";
import ClassNav from "../../components/ClassNav/index.vue";
import HotVideos from "../../components/HotVideos/HotVideos.vue";
import Playlist from "../../components/Playlist/index.vue";
import {  en } from '../../config/config';
import { useStore } from 'vuex';
const store = useStore();
const data = reactive({
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
const router = useRouter();
const getTabsValue = async (value) => {
  store.dispatch('gelMoveiList', { area_id: value.id, limit: data.limit, page: data.page, type: value.name == 'ALL' ? 0 : 1 });
}
const changePage = (page: number) => {
  console.log(page);
}

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
  store.dispatch('gelMoveiList', { category_id: category_id, limit: data.limit, page: page, type: data.MovieType });
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
  store.dispatch('gelMoveiList', { limit: data.limit, page: data.page, type: 0 });

  nextTick().then(async () => {
    console.log(gerHeight.value.$el.offsetHeight);

  })

})
</script>
<!--移动端修改-->
<style scoped>
.HotMovie {
  text-align: left;
  padding: .625rem .625rem 0rem .625rem;
  font-weight: bold;
  width: 100%;
  border-bottom: .0625rem solid #ba7405;
  color: #ba7405;
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


@media (min-width: 48rem) {
  .cus_content_item {
    padding: .625rem;
    overflow: hidden;
    /*margin-bottom: .625rem;*/
  }
}

@media (max-width: 48rem) {
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