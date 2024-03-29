<template>
  <div class="container">
    <!-- <Tabs @selectTab="getTabsValue" /> -->
    <TopNav />
    <Advertising :advertiseList="data.advertiseList" />
    <Playlist :MovieList="data.Homepage" @getMVdata="getMVdata" />
    <ClassNav :movietypeList="data.movietypeList" @getMVdetail="getMVdetail" />
    <div class="HotMovie">Popular video</div>
    <!-- 热门视频 -->
    <Playlist :MovieList="data.Hvideolist" @getMVdata="getMVdata" />
    <!-- <HotVideos @ChangeHotvideo="handTohotMovie" :HotVideoList="data.Hvideolist" @getMoviedata="getMoviedata" /> -->
    <el-pagination @change="handeChange" :style="{ float: 'right', right: '3.125rem' }" layout="prev, pager, next"
      :total="data.total" />

  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, onMounted, computed } from "vue";
import { useRouter } from 'vue-router';
import { ApiPost } from "../../utils/request";
import { isMobile } from "../../utils/isMobil";
import Tabs from "../../components/Tabs/Tabs.vue";
import TopNav from "../../components/TopNav/index.vue";
import Advertising from "../../components/Advertising/index.vue";
import ClassNav from "../../components/ClassNav/index.vue";
import HotVideos from "../../components/HotVideos/HotVideos.vue";
import Playlist from "../../components/Playlist/index.vue";

import { useStore } from 'vuex';
const store = useStore();
const data = reactive({
  limit: 12,
  page: 1,
  currentPage: 1,
  pageSize: 5,
  total: computed(() => store.state.MovieTotal),
  form: {
    type: -1
  },
  advertiseList: computed(() => store.state.advertiseList.filter(item => item.type == 1 && item.jump_type == 2)),
  movietypeList: computed(() => store.state.movietypeList.map((item, index) => {

    return {
      title: item.name,
      show: item.show,
      list: item.children.length < 8 ? item.children : item.children.slice(0, 8),
    }
  })),
  Hvideolist: computed(() => store.state.MovieList),
  isMobile: isMobile(),
  Homepage:computed(() => store.state.TopMovieList)
})

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
    movieinfo: res.data
  }
  router.push({ path: '/play' });
  store.commit('setMovieInfo', data)
}
const getMVdetail = async (info) => {
  // console.log(info,'这是上面吗');
  
  store.dispatch('gelMoveiList', { category_id: info.id, limit: data.limit, page: data.page, type: info.name == '全部' ? 0 : 2 });
}
const getMoviedata = (data) => {
  console.log(data);
}
const getMVdata = async (e) => {
  let res = await ApiPost('/movie/getmovieinfo', { id: e.id })
  let data = {
    query: e,
    movieinfo: res.data
  }
  router.push({ path: '/play' });
  store.commit('setMovieInfo', data)
}
const handeChange = (page: number) => {
  store.dispatch('gelMoveiList', { limit: data.limit, page: page, type: 0 });
  window.scrollTo(0, 1400);
}

onMounted(() => {
  store.dispatch('gelMoveiList', { limit: data.limit, page: data.page, type: 0 });
  let query: object = router.currentRoute.value.query
})
</script>
<!--移动端修改-->
<style scoped>
.HotMovie {
  text-align: left;
  margin: .625rem .625rem 0rem .625rem;
  font-weight: bold;
  width: 95%;
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