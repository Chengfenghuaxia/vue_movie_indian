<template>
  <div v-if="d.vediosList.length>0">
    <div class="video_movies">
    <div class="video_movies_item" v-for="(item, index) in d.vediosList.slice(0, 4)">
      <div @click="handlePlayVideo(item)">
        <div v-if="item.picture" class="left_movie" :style="{ backgroundImage: 'url(' +d.res_url_prefix+item.picture + ')' }">
        </div>
        <div v-else class="left_movie" :style="{ backgroundImage: 'url(' + d.imageUrl + ')' }"></div>
        <div :style="{ textAlign: 'left', fontSize: '.6875rem', color: '#000' }">{{ truncatedText(item.name) }}
        </div>
        <span :style="{ textAlign: 'left', fontSize: '.6875rem', color: '#000' }">Release date：{{
      fmtDate(item.release_time)
    }}</span>
      </div>
    </div>
  </div> 
  </div>   
  <el-empty v-if="d.list.length <= 0" style="padding: 10px 0;margin: 0 auto" description="No relevant data is available"/>  
</template>

<script setup lang="ts">
import { defineProps, onMounted, reactive } from 'vue'
import { ApiPost } from "../../utils/request";
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
import {ElMessage} from "element-plus";
const store = useStore();
const router = useRouter()
const props = defineProps({
  list: Array,
  col: Number,
  type: Number
})
const d = reactive({
  col: 0,
  list: Array,
  width: 0,
  maxLength: 10,
  imageUrl: 'require(../../assets/image/images.jpg)',
  vediosList: [],
  res_url_prefix:""
})

// 图片加载失败事件
const handleImg = (e: Event) => {
  // e.target.style.display = "none"
  (e.target as any).style.display = "none"
}

const handlePlayVideo = async (e) => {
  console.log(e.id);
  
  let res = await ApiPost('/movie/getmovieinfo', { id: e.id })
  let data = {
    query: e,
    movieinfo: (res as any).data
  }
  router.push({ path: '/play'});
  store.commit('setMovieInfo', data)
}




const getVidiosList = async (type) => {
  console.log('type: ', type);
  let res = await ApiPost('/movie/pagebytype', { type, page: 1, limit: 4 })
  if (res.code === 0) {
    d.vediosList = res.data.list
    d.res_url_prefix = res.data.res_url_prefix
  } else {
    ElMessage.error({ message: `${type == 4 ? '最新上映' : type == 5 ? '最新更新' : ''}视频获取类败`, duration: 1000 })
  }
}

onMounted(() => {
  getVidiosList(props.type)
})

const truncatedText = (text) => {
  if (text.length > d.maxLength) {
    return text.substring(0, d.maxLength) + '...';
  } else {
    return text;
  }
}


const fmtDate = (time) => {
  let T = (time + '').length > 11 ? time : time * 1000;
    const date = new Date(T);
    return ('0' + date.getDate()).slice(-2) + '/' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
        date.getFullYear();
}

</script>

<style scoped>
.default_image {
  background: url("/src/assets/image/404.png");
  background-size: cover;
}

:deep(.el-empty) {
  --el-empty-fill-color-1: rgba(155, 73, 231, 0.72);
  --el-empty-fill-color-2: #67d9e891;
  --el-empty-fill-color-3: rgb(106 19 187 / 72%);
  --el-empty-fill-color-4: #67d9e8;
  --el-empty-fill-color-5: #5abcc9;
  --el-empty-fill-color-6: #9fb2d9;
  --el-empty-fill-color-7: #61989f;
  --el-empty-fill-color-8: #697dc5;
  --el-empty-fill-color-9: rgb(43 51 63 / 44%);
}

/*wrap*/
@media (max-width: 768px) {
  .video_movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    justify-content: flex-start;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .video_movies_item {

    margin-bottom: 90px;
    width: 45%;
    margin-left: 5%;
    height: 70px;

  }

  .left_movie {
    width: 90%;
    height: 100px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 100px;
    background-image: url('../../assets/image/images.jpg');
    background-size: cover;
    background-position: center;
  }

  /*展示区域*/
  .c_content {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
  }

  .c_content .item {
    /*  flex-basis: calc(33% - 7px);
      max-width: 33%;*/
    margin: 0 4px 20px 4px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .item .link_content {
    padding-top: 125%;
    position: relative;
    border-radius: 5px;
    display: flex;
    width: 100%;
    background-size: cover;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .tag_group {
    display: none;
  }

  .content_text_tag {
    font-size: 11px !important;
    color: rgb(221, 221, 221);
    width: 96% !important;
    max-height: 40px;
    line-height: 20px;
    padding: 2px 0 2px 0 !important;
    text-align: left;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .cus_remark {
    z-index: 10;
    position: absolute;
    bottom: 0;
    display: block;
    width: 100%;
    font-size: 12px;
    color: #c2c2c2;
    text-align: center;
    background: rgba(0, 0, 0, 0.55);
    border-radius: 0 0 5px 5px;
  }
}

/*pc*/
@media (min-width: 768px) {
  .video_movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    justify-content: flex-start;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .video_movies_item {

    margin-bottom: 190px;
    width: 45%;
    margin-left: 5%;
    height: 70px;

  }

  .left_movie {
    width: 90%;
    height: 200px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 100px;
    background-image: url('../../assets/image/images.jpg');
    background-size: cover;
    background-position: center;
  }

  /*展示区域*/
  .c_content {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
  }

  .c_content .item {
    /*  flex-basis: calc(33% - 7px);
      max-width: 33%;*/
    margin: 0 4px 20px 4px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .item .link_content {
    padding-top: 125%;
    position: relative;
    border-radius: 5px;
    display: flex;
    width: 100%;
    background-size: cover;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .tag_group {
    display: none;
  }

  .content_text_tag {
    font-size: 11px !important;
    color: rgb(221, 221, 221);
    width: 96% !important;
    max-height: 40px;
    line-height: 20px;
    padding: 2px 0 2px 0 !important;
    text-align: left;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .cus_remark {
    z-index: 10;
    position: absolute;
    bottom: 0;
    display: block;
    width: 100%;
    font-size: 12px;
    color: #c2c2c2;
    text-align: center;
    background: rgba(0, 0, 0, 0.55);
    border-radius: 0 0 5px 5px;
  }
}
</style>