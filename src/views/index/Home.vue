<template>
  <div class="container">
    <Tabs @selectTab="getTabsValue" />
    <Advertising :advertiseList="data.advertiseList" />
    <Playlist :MovieList="data.Hvideolist" @getMVdata="getMVdata" />
    <ClassNav :movietypeList="data.movietypeList" @getMVdetail="getMVdetail" />
    <div class="HotMovie">Popular video</div> 
    <!-- 热门视频 -->
    <HotVideos @ChangeHotvideo="handTohotMovie" :HotVideoList="data.Hvideolist" @getMoviedata="getMoviedata" />

    <!-- <van-pagination v-model="data.currentPage" :total-items="data.total" :show-page-size="data.pageSize" force-ellipses
      @change="changePage" /> -->
    <el-pagination :style="{ float: 'right', right: '3.125rem' }" layout="prev, pager, next" :total="data.total" />

  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, onMounted, computed } from "vue";
import { useRouter } from 'vue-router';
import { ApiPost } from "../../utils/request";
import { isMobile } from "../../utils/isMobil";
import Tabs from "../../components/Tabs/Tabs.vue";
import Advertising from "../../components/Advertising/index.vue";
import ClassNav from "../../components/ClassNav/index.vue";
import HotVideos from "../../components/HotVideos/HotVideos.vue";
import Playlist from "../../components/Playlist/index.vue";

import { useStore } from 'vuex';
const store = useStore();
const data = reactive({
  limit: 10,
  page: 1,
  currentPage: 1,
  pageSize: 5,
  total: 10,
  form: {
    type: -1
  },
  advertiseList: computed(() => store.state.advertiseList.filter(item => item.type == 1 && item.jump_type == 2)),
  movietypeList: computed(() => store.state.movietypeList.map(item => {
    return {
      title: item.name,
      show: item.show,
      list1: item.children ? item.children.filter((k, index) => index < 4).map(j => { return { name: j.name, id: j.id, show: j.show } }) : [],
      list2: item.children ? item.children.filter((item, index) => index >= 4).map(item => { return { name: item.name, id: item.id, show: item.show } }) : []
    }
  })),
  Hvideolist: computed(() => store.state.MovieList),
  isMobile: isMobile(),

})

const router = useRouter();
const getTabsValue = async (value) => {


  // let res = await ApiPost('/movie/pagebyareahits', { area_id: value.id })
  store.dispatch('gelMoveiList', { area_id: value.id, limit: data.limit, page: data.page, type: value.name == '全部' ? 0 : 1 });
  // let data ={
  //   query: JSON.stringify(res.data.list),
  //   value:JSON.stringify(value)
  // }
  // router.push({ path: '/filmClassify', query: data });
}
const changePage = (page: number) => {
  console.log(page);
}

const handTohotMovie = async (e) => {
  let res = await ApiPost('/movie/getmovieinfo', { id: e.id })
  let data = {
    query: JSON.stringify(e),
    movieinfo: JSON.stringify(res.data)
  }

  router.push({ path: '/play', query: data });
}
const getMVdetail = async (info) => {
  store.dispatch('gelMoveiList', { category_id: info.id, limit: data.limit, page: data.page, type: info.name == '全部' ? 0 : 2 });
}
const getMoviedata = (data) => {
  console.log(data);

  // store.dispatch('gelMoveiList', data);
}
const getMVdata = async (e) => {
  let res = await ApiPost('/movie/getmovieinfo', { id: e.id })
  let data = {
    query: JSON.stringify(e),
    movieinfo: JSON.stringify(res.data)
  }

  router.push({ path: '/play', query: data });
}
</script>
<!--移动端修改-->
<style scoped>
.HotMovie {
  text-align: left;
  margin: .625rem .625rem 0rem .625rem;
  font-weight: bold;
  width: 95%;
  border-bottom: .0625rem solid #000;
  color: #000;
}
</style>
<style scoped>
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

<!--轮播图双端样式-->
<style scoped>
@media (max-width: 48rem) {
  :deep(.el-carousel) {
    --el-carousel-arrow-size: 1.875rem;
    --el-carousel-arrow-background: rgba(115, 133, 159, 0.5);
  }

  :deep(.el-carousel__arrow) {
    outline: none;
    border: none !important;
  }

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 12.5rem;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: transparent;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: transparent;
  }

  :deep(.el-carousel__indicators) {
    width: 100% !important;
    text-align: right;
    height: 1.25rem;
    line-height: 1.25rem;
    padding-right: .625rem;
    --el-carousel-indicator-padding-vertical: 0;
  }

  :deep(.el-carousel__button) {
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    padding: 0 0 !important;
    margin: 0 .125rem;
  }

  .banner_wrap {
    margin: -0.9375rem 0 1.25rem 0;
    position: relative;
    box-shadow: 0 .3125rem 1.875rem 0 rgba(255, 255, 255, 0.15);
  }

  .carousel-tags {
    position: absolute;
    top: 10.625rem;
    left: 25%;
  }

  .carousel-tags span {
    font-size: .75rem;
    background: rgba(0, 0, 0, 0.55);
    color: #ffffff;
    padding: .125rem .3125rem;
    margin: .125rem .3125rem;
  }

  .carousel-title {
    font-size: .75rem;
    position: absolute;
    bottom: 0;
    height: 1.25rem;
    line-height: 1.25rem;
    background: rgba(0, 0, 0, 0.5);
    text-align: left;
    width: 100%;
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 显示省略号 */
  }
}


@media (min-width: 48rem) {
  :deep(.el-carousel) {
    --el-carousel-arrow-size: 1.875rem;
    --el-carousel-arrow-background: rgba(115, 133, 159, 0.5);
  }

  :deep(.el-carousel__arrow) {
    outline: none;
    border: none !important;
  }

  .container {
    /*    padding-top: 41.25rem;*/
  }

  .banner2 {
    height: 37.5rem;
    position: absolute;
    margin-top: 3.75rem;
    left: 0;
    top: 0;
    box-shadow: inset 0 -2.5rem 1.875rem 1.25rem rgba(0, 0, 0, 0.6), 0 .3125rem 1.875rem 0 rgba(255, 255, 255, 0.15);
    padding: 2%;
    margin-bottom: .625rem;
    border-radius: 0 0 .375rem .375rem;
    width: 100%;
  }

  .preview2 {
    width: 16.25rem;
    height: 12.5rem;
    position: absolute;
    right: 3.125rem;
    bottom: 3.75rem;
  }

  .banner {
    height: 37.5rem;
    box-shadow: inset 0 -2.5rem 1.875rem 1.25rem rgba(0, 0, 0, 0.6), 0 .3125rem 1.875rem 0 rgba(255, 255, 255, 0.15);
    position: relative;
    padding: 2%;
    margin-bottom: .625rem;
    border-radius: .375rem;
    width: 100%;
  }

  .preview {
    width: 16.25rem;
    height: 12.5rem;
    position: absolute;
    right: 3.125rem;
    bottom: 3.75rem;
    /*  border: .0625rem solid skyblue;*/
  }

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 12.5rem;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: transparent;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: transparent;
  }

  :deep(.el-carousel__indicators) {
    width: 100% !important;
  }

  :deep(.el-carousel__button) {
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    margin: 0 .125rem;
  }

  .carousel-tags {
    position: absolute;
    top: 10.625rem;
    left: 25%;
  }

  .carousel-tags span {
    font-size: .75rem;
    background: rgba(0, 0, 0, 0.55);
    color: #ffffff;
    padding: .125rem .3125rem;
    margin: .125rem .3125rem;
  }

  .carousel-title {
    font-size: .75rem;
    max-width: 50%;

    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 显示省略号 */
  }
}
</style>../../utils/isMobil
