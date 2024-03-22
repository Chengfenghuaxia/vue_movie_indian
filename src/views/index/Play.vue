<template>
  <div class="player_area" v-show="data.loading">
    <Advertising :advertiseList="data.advertiseList" :movietypeList="data.movietypeList" />
    <ClassNav :movietypeList="data.movietypeList" @getMVdetail="getMVdetail" />
    <div class="player_p">
      <video class="video_window" ref="videoa" controls :poster="data.MovieDetail.picture"></video>
    </div>
    <!-- 视频详情 -->
    <div class="Movie_detail_name">
      <el-form-item label="Film title:">
        <span style="font-size:1rem;">{{ data.MovieDetail.name }}</span>
      </el-form-item>
    </div>
    <div class="Movie_detail">
      <div class="Movie_detail_left">
        <el-form label-width="auto" style="max-width: 37.5rem">

          <el-form-item label="Starring:">
            <span style="font-size:1rem;">{{ data.MovieDetail.actor }}</span>
          </el-form-item>
          <el-form-item label="Area:">
            <span style="font-size:1rem;">{{ data.MovieDetail.area }}</span>
          </el-form-item>
          <el-form-item label="Release date:">
            <span style="font-size:.875rem;">{{ fmtDate(Number(data.MovieDetail.release_time)) }}</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="Movie_detail_right">
        <el-form label-width="auto" style="max-width: 37.5rem;margin-left:1.875rem">

          <el-form-item label="Language:">
            <span style="font-size:1rem;">{{ data.MovieDetail.language }}</span>
          </el-form-item>
          <el-form-item label="Type:">
            <span style="font-size:.875rem;">{{ fmtTags(data.MovieDetail.tags) }}</span>
          </el-form-item>
          <el-form-item label="Time of play:">
            <span style="font-size:1rem;">{{ data.MovieDetail.hits }}</span>
          </el-form-item>
        </el-form>
      </div>

    </div>
    <p class="blurb">Brief introduction：</p>
    <div class="Movie_details">
      <span>
        {{ data.MovieDetail.blurb }}
      </span>

    </div>
    <!--相关推荐-->
    <div class="correlation">
      <div class="HotMovie">Related Recommendation</div>
      <HotVideos @ChangeHotvideo="handTohotMovie" :HotVideoList="data.relate" />
    </div>
    <!-- 广告弹窗 -->
    <Dialog :dvData="data.dvData" />


  </div>
</template>

<script lang="ts" setup>
import {
  onBeforeMount,
  computed,
  reactive,
  ref,
  nextTick
} from "vue";
import Plyr from 'plyr';
import Hls from 'hls.js';
import { useRouter } from "vue-router";
import Advertising from "../../components/Advertising/index.vue";
import ClassNav from "../../components/ClassNav/index.vue";
import Dialog from "../../components/Dialog/Dialog.vue";
import RelateList from "../../components/index/RelateList.vue";
import HotVideos from "../../components/HotVideos/HotVideos.vue";
import 'video.js/dist/video-js.css'
import { ApiGet, ApiPost } from "../../utils/request";
import axios from 'axios';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter()
const videoPlayer = ref(null);
const videoa = ref(null);
// 播放页所需数据
const data = reactive({
  limit: 10,
  page: 1,
  token: "",
  tags: "",
  dvData: [],
  loading: true,
  query: {
    title: "",
    src: "",
  },
  relate: computed(() => store.state.MovieList),
  MovieDetail: {},
  advertiseList: computed(() => store.state.advertiseList.filter(item => item.type == 1 && item.jump_type == 2)),
  movietypeList: computed(() => store.state.movietypeList.map(item => {
    return {
      title: item.name,
      show: item.show,
      list1: item.children ? item.children.filter((k, index) => index < 4).map(j => { return { name: j.name, id: j.id, show: j.show } }) : [],
      list2: item.children ? item.children.filter((item, index) => index >= 4 && index < 8).map(item => { return { name: item.name, id: item.id, show: item.show } }) : []
    }
  })),
})

// 初始化HLS
const initHLS = (MVinfo) => {
  nextTick().then(async () => {
    //获取m3u8文件
    let lastSlashIndex = MVinfo.play_link.lastIndexOf("/");
    let link = MVinfo.play_link.substring(0, lastSlashIndex + 1); // 包含最后的斜杠
    if (MVinfo.info.play_type==1) {  // 如果非外链
      const response = await axios.get(MVinfo.play_link);
      let m3u8Content = response.data;
      m3u8Content = m3u8Content.replace(/%s/g, `${import.meta.env.VITE_API_BASE_URL}verify/getenckey?token=${MVinfo.token}&enc_key=${MVinfo.info.enc_key}`); // 当前请求地址
      m3u8Content = m3u8Content.replace(/(.*\.ts)/g, `${link}$1`);
      const blob = new Blob([m3u8Content], { type: 'application/x-mpegURL' });
      const url = URL.createObjectURL(blob);
      if (Hls.isSupported()) {
        const video = videoa.value;
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
      }
    }else{ //走外链
      if (Hls.isSupported()) {
        const video = videoa.value;
        const hls = new Hls();
        hls.loadSource(MVinfo.info.ext_link);
        hls.attachMedia(video);
      }
    }
  });
}
const handTohotMovie = async (e) => {
  console.log(e, '看看有什么');
  let res = await ApiPost('/movie/getmovieinfo', { id: e.id })
  data.MovieDetail = e
  await initHLS(res.data)
  window.scrollTo(0, 500);
}

const changePage = (page: number) => {
  console.log(page);
}
const getMVdetail = (info) => {
  store.dispatch('gelMoveiList', { category_id: info.id, limit: data.limit, page: data.page, type: info.name == '全部' ? 0 : 2 });
}
const truncatedText = (text) => {
  if (text.length > 10) {
    return text.substring(0, 10) + '...';
  } else {
    return text;
  }

}
const fmtTags = (tags: any) => {
  let str = ''
  tags.map((item, index) => {
    if (tags.length - 1 > index) {
      str += item + '、'
    } else {
      str += item
    }
  })
  return str
}
const fmtDate = (time) => {
  const date = new Date(time);
  return date.getFullYear() + '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('0' + date.getDate()).slice(-2);
}
//取广告然后传给子组件



// 初始化页面数据
onBeforeMount(async () => {
  let query:object = router.currentRoute.value.query
  let movieinfo = JSON.parse(query.movieinfo)
  data.MovieDetail = JSON.parse(query.query)
  store.dispatch('gelMoveiList', { category_id: movieinfo.info.cid, limit: data.limit, page: data.page, type: 2 });
  await initHLS(movieinfo)
})
</script>

<style scoped>
@import "/src/assets/css/film.css";

/* PC端 */
@media (min-width: 48rem) {
  :deep(.plyr--video) {
    width: 100%;
    height: 50rem;
    /* height: auto; */
  }

  .player_area {
    padding: .625rem 6%;
  }

  .Movie_details {
    width: 96%;
    min-height: 3.125rem;
    padding: 0 0 0 1%;
    margin-left: 2%;
    border-radius: .3125rem;
    background-color: rgb(45, 204, 204);
    text-align: left;
    font-size: .875rem;
    margin-top: .625rem;

  }

  .video_window {
    width: 100%;
    height: 37.5rem;
    object-fit: cover;
  }

  .Movie_detail {
    color: black;
    background: #ba7405;
    width: 100;
    height: 9.375rem;
    display: flex;
  }

  .Movie_detail_left {
    width: 50%;
    height: 12.5rem;
    padding-left: .625rem;
    font-size: 1.125rem
  }

  .Movie_detail_right {
    height: 12.5rem;
    width: 50%;
  }

  video {
    width: 100%;
    height: 16.25rem;
  }

  .video_title {
    width: 100%;
    height: 1.25rem;
    padding: 0 0 0 1.25rem;
    text-align: left;
    /* margin-top: 1.875rem; */
  }

  .Movie_detail_name {
    margin-left: 1.25rem;
    color: black;
    width: 94%;
    font-size: .875rem;
    min-height: 1.875rem;
    text-align: left;
  }

  .blurb {
    padding: 0;
    margin: 0;
    text-align: left;
    padding-left: .625rem;
    color: black;
  }

  .HotMovie {
    text-align: left;
    margin: .625rem .625rem 0rem .625rem;
    font-weight: bold;
    font-size: 1.25rem;
    width: 95%;
    border-bottom: .0625rem solid #e6e6e6;
    color: rgb(194, 190, 190);
  }
}
</style>

<!--移动端-->
<style scoped>
/*适应小尺寸*/
@media (max-width: 48rem) {
  :deep(.plyr--video) {
    width: 100%;
    height: 12.5rem;
    /* height: auto; */
  }

  .Movie_details {
    width: 96%;
    min-height: 1.25rem;
    padding: 0 0 0 1%;
    margin-left: 2%;
    border-radius: .3125rem;
    background-color: rgb(45, 204, 204);
    text-align: left;
    font-size: .875rem;
    margin-top: .625rem;

  }

  .video_window {
    width: 100%;
    max-width: 40rem;
    object-fit: cover;
  }

  .Movie_detail {
    color: black;
    width: 96%;
    margin-left: 2%;
    border-radius: .3125rem;
    height: 10.375rem;
    background: #ba7405;
    display: flex;
  }

  .Movie_detail_left {
    width: 50%;
    height: 12.5rem;
    padding-left: .625rem;
    font-size: 1.125rem
  }

  .Movie_detail_right {
    height: 12.5rem;
    width: 50%;

  }

  video {
    width: 100%;
    height: 16.25rem;
  }

  .video_title {
    width: 100%;
    height: 1.25rem;
    padding: 0 0 0 1.25rem;
    text-align: left;
    /* margin-top: 1.875rem; */
  }

  .HotMovie {
    text-align: left;
    margin: .625rem .625rem 0rem .625rem;
    font-weight: bold;
    width: 95%;
    border-bottom: .0625rem solid #e6e6e6;
    color: black;
  }

  .Movie_detail_name {
    margin-left: 1.25rem;
    color: black;
    width: 94%;
    font-size: .875rem;
    min-height: 1.875rem;
    text-align: left;
  }

  .blurb {
    padding: 0;
    margin: 0;
    text-align: left;
    padding-left: .625rem;
    color: black;
  }
}
</style>