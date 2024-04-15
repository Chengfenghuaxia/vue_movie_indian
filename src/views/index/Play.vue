<template>
  <div class="player_area" v-show="data.loading">
    <Advertising :advertiseList="data.advertiseList" :movietypeList="data.movietypeList" />
    <!-- <ClassNav :movietypeList="data.movietypeList" @getMVdetail="getMVdetail" /> -->
    <div class="player_p">
      <video playsinline class="video_window" ref="videoa" controls
        :poster="data.res_url_prefix + data.data_MovieInfo.query.picture"></video>
      <!-- <span class="Video_duration">视频时长:{{ formattedDuration }}</span> -->
    </div>
    <!-- 视频详情 -->
    <div class="Movie_detail_name">

      <span style="font-size:1rem;">{{ data.data_MovieInfo.query.name }}</span>

    </div>
    <div class="Movie_detail_digua">

      <div class="Movie_detail">
        <div class="Movie_detail_left">
          <el-form style="max-width: 37.5rem">

            <!-- <el-form-item label="Starring:">
            <span style="font-size:1rem;">{{ data.data_MovieInfo.query.actor }}</span>
          </el-form-item> -->
            <el-form-item label="Area:">
              <span style="font-size:1rem;">{{ data.data_MovieInfo.query.area }}</span>
            </el-form-item>
            <el-form-item label="RE:">
              <span style="font-size:.875rem;">{{ fmtDate(Number(data.data_MovieInfo.query.release_time)) }}</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="Movie_detail_right">
          <el-form style="max-width: 37.5rem;">

            <el-form-item label="Language:">
              <span style="font-size:1rem;">{{ data.data_MovieInfo.query.language }}</span>
            </el-form-item>
            <el-form-item label="Time of play:">
              <span style="font-size:1rem;">{{ data.data_MovieInfo.query.hits }}</span>
            </el-form-item>
            <!-- <el-form-item label="Type:">
            <span style="font-size:.875rem;">{{ fmtTags(data.data_MovieInfo.query.tags) }}</span>
          </el-form-item> -->
            <div class="video_tags">
              <div class="video_tags_item" v-for="(item, index) in data.data_MovieInfo.query.tags" :key="index">{{ item
                }}
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <p class="blurb" v-if="data.data_MovieInfo.query.blurb">{{ en.brief }}</p>
    <div class="Movie_details" v-if="data.data_MovieInfo.query.blurb">
      <span>
        {{ data.data_MovieInfo.query.blurb }}
      </span>

    </div>
    <!--相关推荐-->
    <div class="correlation">
      <div class="HotMovie" :style="{ color: '#ba7405' }">{{ en.related_suggestion }}</div>
      <HotVideos @ChangeHotvideo="handTohotMovie" :HotVideoList="data.relate" />
    </div>
    <!-- 广告弹窗 -->
    <Dialog :dvData="data.dvData" />

    <!-- <el-pagination @change="handeChange" :style="{ float: 'right', right: '3.125rem' }" layout="prev, pager, next"
      :total="data.total" /> -->
    <el-pagination @current-change="handeChange" :style="{ float: 'right', right: '3.125rem' }"
      layout="prev, pager, next" :page-size="data.limit" :current-page="data.currentPage" :total="data.total" />
  </div>
</template>

<script lang="ts" setup>
import { en } from '../../config/config';
import {
  onBeforeMount,
  onMounted,
  onUnmounted,
  computed,
  reactive,
  ref,
  nextTick
} from "vue";
import Hls from 'hls.js';
import { useRouter } from "vue-router";
import Advertising from "../../components/Advertising/index.vue";
import ClassNav from "../../components/ClassNav/index.vue";
import Dialog from "../../components/Dialog/Dialog.vue";
// import RelateList from "../../components/index/RelateList.vue";
import HotVideos from "../../components/HotVideos/HotVideos.vue";
import 'video.js/dist/video-js.css'
import { ApiPost } from "../../utils/request";
import axios from 'axios';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter()
const videoa = ref(null);
// 播放页所需数据
const data = reactive({
  limit: 12,
  page: 1,
  currentPage: 1,
  total: computed(() => store.state.MovieTotal),
  token: "",
  tags: "",
  dvData: [],
  loading: true,
  query: {
    title: "",
    src: "",
  },
  data_MovieInfo: computed(() => store.state.MovieInfo),
  relate: computed(() => store.state.MovieList),
  res_url_prefix: computed(() => store.state.res_url_prefix),
  MovieDetail: {},
  advertiseList: computed(() => store.state.advertiseList.filter(item => item.type == 1 && item.jump_type == 2)),
  movietypeList: computed(() => store.state.movietypeList.map(item => {
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
  duration: 0,
  hls: new Hls()
})

// 初始化HLS
const initHLS = (MVinfo) => {
  nextTick().then(async () => {
    const video = videoa.value;
    //获取m3u8文件
    let lastSlashIndex = MVinfo.play_link.lastIndexOf("/");
    let link = MVinfo.play_link.substring(0, lastSlashIndex + 1); // 包含最后的斜杠
    if (MVinfo.info.play_type == 1) {  // 如果非外链
      const response = await axios.get(MVinfo.play_link);
      let m3u8Content = response.data;
      m3u8Content = m3u8Content.replace(/%s/g, `${import.meta.env.VITE_API_BASE_URL}verify/getenckey?token=${MVinfo.token}&enc_key=${MVinfo.info.enc_key}`); // 当前请求地址
      m3u8Content = m3u8Content.replace(/(.*\.ts)/g, `${link}$1`);
      const blob = new Blob([m3u8Content], { type: 'application/x-mpegURL' });
      const url = URL.createObjectURL(blob);
      if (Hls.isSupported()) {
        data.hls.loadSource(url);
        data.hls.attachMedia(video);
      }
    } else if (MVinfo.info.play_type == 2) {  //无加密
      if (Hls.isSupported()) {
        data.hls.loadSource(MVinfo.play_link);
        data.hls.attachMedia(video);
      }
    } else { //走外链
      if (Hls.isSupported()) {
        data.hls.loadSource(MVinfo.info.ext_link);
        data.hls.attachMedia(video);
      }
    }
  });
}
const handTohotMovie = async (e) => {

  let res = await ApiPost('/movie/getmovieinfo', { id: e.id })
  data.data_MovieInfo.query = e
  await initHLS((res as any).data)
  window.scrollTo(0, 500);
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
//校验时间格式
const fmtDate = (time) => {
  let T = (time + '').length > 11 ? time : time * 1000
  const date = new Date(T);
  return date.getFullYear() + '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('0' + date.getDate()).slice(-2);
}
const handeChange = (page: number) => {
  let category_id = localStorage.getItem('PLAY_category_id')
  data.currentPage = page
  store.dispatch('gelMoveiList', { category_id: category_id, limit: data.limit, page: page, type: 2 });
}

// 格式化视频时长
const formattedDuration = computed(() => {
  const hours = Math.floor(data.duration / 3600);
  const minutes = Math.floor((data.duration % 3600) / 60);
  const seconds = Math.floor(data.duration % 60);
  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});
const duration = () => {
  data.duration = videoa.value.duration;
}
let intervalId = null; // 用于存储定时器ID
// 定义更新视频播放进度的函数
const updateVideoTime = () => {
  if (videoa.value) {
    localStorage.setItem('videoTime', videoa.value.currentTime.toString());
  }
};
// 同步视频播放进度
const syncVideoTime = () => {


  const video = videoa.value;
  let movieinfo = data.data_MovieInfo.movieinfo
  let accMVname = localStorage.getItem('Movie_name')
  if (movieinfo) {
    if (accMVname && movieinfo.info.name === accMVname) {
      const savedTime = localStorage.getItem('videoTime');
      if (savedTime) {
        video.currentTime = parseFloat(savedTime);
      }
    } else {
      localStorage.setItem('Movie_name', movieinfo.info.name);
    }
  }

}

//取广告然后传给子组件
onMounted(() => {
  nextTick().then(async () => {
    syncVideoTime()
  })
  intervalId = setInterval(updateVideoTime, 5000); //每5秒同步一次播放进度
  videoa.value.addEventListener('loadedmetadata', duration);
})
// 初始化页面数据
onBeforeMount(async () => {
  let movieinfo = data.data_MovieInfo.movieinfo
  if (movieinfo) {
    localStorage.setItem('PLAY_category_id', movieinfo.info.cid)
    store.dispatch('gelMoveiList', { category_id: movieinfo ? movieinfo.info.cid : "", limit: data.limit, page: data.page, type: 2 });
    await initHLS(movieinfo)
  }
})
onUnmounted(() => {
  // 组件销毁前移除事件监听器
  if (videoa.value) {
    videoa.value.removeEventListener('loadedmetadata');
  }
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
  data.hls.destroy()

})
</script>

<style scoped lang="less">
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
    background-color: rgb(77, 78, 78);
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
    background: #ece5d9;
    width: 100;
    height: 9.375rem;
    display: flex;
    height: 7.375rem;
    padding-top: 20px;
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
    border-bottom: .0625rem solid #ba7405;
    color: rgb(194, 190, 190);
  }

  .video_tags {
    width: 100%;
    height: 2rem;
    font-size: 14px;
    line-height: 2rem;
    display: flex;
    justify-content: space-around;

    .video_tags_item {
      background-color: #ba7405;
      padding: 0 .3125rem;
      border-radius: .3125rem;
    }
  }
}
</style>

// <!--移动端-->
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
    background-color: rgb(77, 78, 78);
    text-align: left;
    font-size: .875rem;
    margin-top: .625rem;

  }

  .video_window {
    width: 100%;
    max-width: 40rem;
    object-fit: cover;

    .Video_duration {
      color: #000;
      text-align: left;
    }
  }

  .Movie_detail {
    color: black;
    width: 96%;
    margin-left: 2%;
    border-radius: .3125rem;
    height: 7.375rem;
    padding-top: 20px;
    background: #ece5d9;
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

  .video_tags {
    width: 100%;
    height: 2rem;
    font-size: 14px;
    line-height: 2rem;
    display: flex;
    justify-content: space-around;

    .video_tags_item {
      background-color: #ba7405;
      padding: 0 .3125rem;
      border-radius: .3125rem;
    }
  }

}
</style>
