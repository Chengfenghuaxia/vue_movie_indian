<template>
  <div class="container">
    <Tabs @selectTab="getTabsValue" />
    <Advertising :advertiseList="data.advertiseList" />
    <Playlist :MovieList="data.Hvideolist" @getMVdata="getMVdata" />
    <ClassNav :movietypeList="data.movietypeList" @getMVdetail="getMVdetail" />
    <div class="HotMovie">热门视频</div>
    <HotVideos @ChangeHotvideo="handTohotMovie" :HotVideoList="data.Hvideolist" @getMoviedata="getMoviedata" />

    <!-- <van-pagination v-model="data.currentPage" :total-items="data.total" :show-page-size="data.pageSize" force-ellipses
      @change="changePage" /> -->
    <el-pagination :style="{ float: 'right', right: '50px' }" layout="prev, pager, next" :total="data.total" />

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
}
const getMVdata = async (e) => {
  let res = await ApiPost('/movie/getmovieinfo', { id: e.id })
  let data = {
    query: JSON.stringify(e),
    movieinfo: JSON.stringify(res.data)
  }

  router.push({ path: '/play', query: data });
}
onMounted(()=>{
  store.dispatch('gelMoveiList', { limit: 10, page: 1,type:0 });
})
</script>
<!--移动端修改-->
<style scoped>
.HotMovie {
  text-align: left;
  margin: 10px 10px 0px 10px;
  font-weight: bold;
  width: 95%;
  border-bottom: 1px solid #000;
  color: #000;
}
</style>
<style scoped>
@media (min-width: 768px) {
  .cus_content_item {
    padding: 10px;
    overflow: hidden;
    /*margin-bottom: 10px;*/
  }
}

@media (max-width: 768px) {
  .cus_content_item {
    padding: 0 6px 0 0;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .nav_ul {
    justify-content: end;
  }
}
</style>

<!--轮播图双端样式-->
<style scoped>
@media (max-width: 768px) {
  :deep(.el-carousel) {
    --el-carousel-arrow-size: 30px;
    --el-carousel-arrow-background: rgba(115, 133, 159, 0.5);
  }

  :deep(.el-carousel__arrow) {
    outline: none;
    border: none !important;
  }

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
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
    height: 20px;
    line-height: 20px;
    padding-right: 10px;
    --el-carousel-indicator-padding-vertical: 0;
  }

  :deep(.el-carousel__button) {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    padding: 0 0 !important;
    margin: 0 2px;
  }

  .banner_wrap {
    margin: -15px 0 20px 0;
    position: relative;
    box-shadow: 0 5px 30px 0 rgba(255, 255, 255, 0.15);
  }

  .carousel-tags {
    position: absolute;
    top: 170px;
    left: 25%;
  }

  .carousel-tags span {
    font-size: 12px;
    background: rgba(0, 0, 0, 0.55);
    color: #ffffff;
    padding: 2px 5px;
    margin: 2px 5px;
  }

  .carousel-title {
    font-size: 12px;
    position: absolute;
    bottom: 0;
    height: 20px;
    line-height: 20px;
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


@media (min-width: 768px) {
  :deep(.el-carousel) {
    --el-carousel-arrow-size: 30px;
    --el-carousel-arrow-background: rgba(115, 133, 159, 0.5);
  }

  :deep(.el-carousel__arrow) {
    outline: none;
    border: none !important;
  }

  .container {
    /*    padding-top: 660px;*/
  }

  .banner2 {
    height: 600px;
    position: absolute;
    margin-top: 60px;
    left: 0;
    top: 0;
    box-shadow: inset 0 -40px 30px 20px rgba(0, 0, 0, 0.6), 0 5px 30px 0 rgba(255, 255, 255, 0.15);
    padding: 2%;
    margin-bottom: 10px;
    border-radius: 0 0 6px 6px;
    width: 100%;
  }

  .preview2 {
    width: 260px;
    height: 200px;
    position: absolute;
    right: 50px;
    bottom: 60px;
  }

  .banner {
    height: 600px;
    box-shadow: inset 0 -40px 30px 20px rgba(0, 0, 0, 0.6), 0 5px 30px 0 rgba(255, 255, 255, 0.15);
    position: relative;
    padding: 2%;
    margin-bottom: 10px;
    border-radius: 6px;
    width: 100%;
  }

  .preview {
    width: 260px;
    height: 200px;
    position: absolute;
    right: 50px;
    bottom: 60px;
    /*  border: 1px solid skyblue;*/
  }

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
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
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 0 2px;
  }

  .carousel-tags {
    position: absolute;
    top: 170px;
    left: 25%;
  }

  .carousel-tags span {
    font-size: 12px;
    background: rgba(0, 0, 0, 0.55);
    color: #ffffff;
    padding: 2px 5px;
    margin: 2px 5px;
  }

  .carousel-title {
    font-size: 12px;
    max-width: 50%;

    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 显示省略号 */
  }
}
</style>../../utils/isMobil
