<template>
  <div class="container">
    <!-- <div class="title">
      <a :href="`/filmClassify?Pid=${d.title.id}`" >{{ d.title.name }}</a>
      <span class="line"/>
      <a :href="`/filmClassifySearch?Pid=${d.title.id}`" class="h_active">{{ `${d.title.name}库` }}</a>
    </div> -->
    <!--影片分类检索-->
    <!-- <div class="t_container">
      <div class="t_item" v-for="k in d.search.sortList ">
        <div class="t_title">{{d.search.titles[k]}} <b class="iconfont icon-triangle"/> </div>
        <div class="tag_group">
          <a href="javascript:void(false)" :class="`tag ${t['Value'] === d.searchParams[k]?'t_active':''}`" v-for="t in d.search.tags[k]" @click="handleTag(k,t['Value'])" >
            {{t['Name']}}
          </a>
        </div>
      </div>
    </div> -->

    <!--影片列表展示-->
    <!-- <FilmList :col="7"/> -->

    <!--分页展示区域-->
    <!-- <div class="pagination_container ">
      <el-pagination background layout="prev, pager, next"
                     v-model:current-page="d.page.current"
                     @current-change="changeCurrent"
                     :pager-count="5"

                     :page-size="d.page.pageSize"
                     :total="d.page.total"
                     :prev-icon="ArrowLeftBold"
                     :next-icon="ArrowRightBold"
                     hide-on-single-page
                     class="pagination"/>
    </div> -->
    <!-- <div v-if="d.vediosList.length > 0"> -->
    <div class="video_movies">
      <div class="video_movies_item" v-for="(item, index) in d.vediosList">
        <div @click="handlePlayVideo(item)">
          <div v-if="item.picture" class="left_movie" :style="{ backgroundImage: 'url(' + item.picture + ')' }">
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
    <!-- </div>
    <el-empty v-if="d.list.length <= 0" style="padding: 10px 0;margin: 0 auto"
      description="No relevant data is available" /> -->

  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { ApiGet } from "../../utils/request";
import { ElMessage } from "element-plus";
import { ArrowRightBold, ArrowLeftBold } from '@element-plus/icons-vue'
import FilmList from "../../components/index/FilmList.vue";
import { ApiPost } from "../../utils/request";

// 页面所需数据
const d = reactive({
  imageUrl: 'require(../../assets/image/images.jpg)',
  maxLength: 10,
  videosList: [],
  limit: 10,
  page: 1,
  observer: {},
  title: {
    name: "大陆电影",
    id: 20
  },
  list: [],
  search: {
    sortList: [],
    titles: [],
    tags: [],
  },
  // page: {
  //   current: 0,
  //   pageSize: 10,
  //   total: 20
  // },

  searchParams: {
    Pid: '',
    Category: '',
    Plot: '',
    Area: '',
    Language: '',
    Year: '',
    Sort: '',
  },

})

// 获取路由参数查询对应数据
const router = useRouter()


const handlePlayVideo = async (e) => {
  let res = await ApiPost('/movie/getmovieinfo', { id: e.id })
  let data = {
    query: JSON.stringify(e),
    movieinfo: JSON.stringify(res.data)
  }
  router.push({ path: '/play', query: data });
}

const getVidiosList = async (page, limit, type) => {
  console.log('type: ', type);
  let res = await ApiPost('/movie/pagebytype', { type, page, limit })
  if (res.code === 0) {
    console.log('res:____++ ', res);
    d.vediosList = res.data.list
    console.log('d.vediosList: ', d.vediosList);
  } else {
    ElMessage.error({ message: `${type == 4 ? '最新上映' : type == 5 ? '最新更新' : ''}视频获取类败`, duration: 1000 })
  }
}

// // 分类tag点击事件
// const handleTag = (k: string, v: string) => {
//   // 设置被点击的tag属性值
//   d.searchParams[k as keyof typeof d.searchParams] = v
//   // searchTag改变, 重置 current当前页码
//   d.page.current = 1
//   handleParams()
// }
const handleParams = () => {
  let q = ''
  for (let k in d.searchParams) {
    let val = d.searchParams[k as keyof typeof d.searchParams]
    if (val != '') {
      q += `&${k}=${val}`
    }
  }
  location.href = '/filmClassifySearch?' + q.slice(1) + `&current=${d.page.current}`
}

const truncatedText = (text) => {
  if (text.length > d.maxLength) {
    return text.substring(0, d.maxLength) + '...';
  } else {
    return text;
  }
}


const fmtDate = (time) => {
  let T = (time + '').length > 11 ? time : time * 1000
  const date = new Date(T);
  return date.getFullYear() + '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('0' + date.getDate()).slice(-2);
}


onMounted(() => {
  let type = Number(router.currentRoute.value.query.type)
  console.log('type: ', type);
  getVidiosList(d.page, d.limit, type)
  // this.loadMore(); // 初始加载数据
  d.observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      d.limit += 2;
      d.page += 1;
      getVidiosList(d.limit, d.page, type);
    }
  });
}



  // console.log(router.currentRoute.query)


)



</script>


<!-- <style scoped>
@import "/src/assets/css/classify.css";
@import "/src/assets/css/pagination.css";

@media (min-width: 768px) {
  .tag {
    margin: 0 8px;
    padding: 6px 12px;
  }

  .t_title {
    padding: 3px 0;
  }
}

@media (max-width: 768px) {
  .tag {
    margin: 0 5px;
    padding: 4px 10px;
    font-size: 12px;
  }
}

.t_container {
  display: block;
  font-size: 14px;
  padding-bottom: 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.t_item {
  display: flex;
  justify-content: start;
  margin: 14px 0;
  white-space: nowrap;
}

.t_title {
  display: inline-block;
  font-size: 17px;
  font-weight: 700;
  text-align: left;
  color: rgba(255, 255, 255, 0.35);
  border-radius: 6px;
  margin-right: 12px;
}

.t_title b {
  color: rgba(255, 255, 255, 0.15);
}

.tag_group {
  display: flex;
  justify-content: start;
  flex-flow: nowrap;
  overflow: auto;
}

.tag {
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 5px;
  text-align: center;
}

.t_active {
  background: rgba(255, 255, 255, 0.12);
  color: #ffa500cc !important;
  border: none !important;
}
</style> -->
<!--移动端修改-->
<!-- <style scoped>
@media (max-width: 768px) {

  /*顶部内容区域*/
  .header {
    width: 100%;
    margin-bottom: 100px;
    background: none !important;
  }


}
</style> -->

<style scoped>
.container {
  max-width: 100vw;
}

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


  .c_content {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
  }

  .c_content .item {
    margin-bottom: 20px;
    box-sizing: border-box;
  }

  .item .link_content {
    border-radius: 5px;
    padding-top: 125%;
    background-size: cover;
    width: 100%;
    display: flex;
    position: relative;
    margin-bottom: 5px;
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
    position: absolute;
    bottom: 3px;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: start;
    height: 18px;
    z-index: 10;
    line-height: 18px;
    padding-left: 10px;
  }

  .cus_tag {
    flex-shrink: 0;
    /* 不缩小元素 */
    white-space: nowrap;
    color: rgb(255, 255, 255);
    padding: 0 3px;
    margin-right: 8px;
    background: rgba(0, 0, 0, 0.55);
    font-size: 12px;
    border-radius: 5px;
  }

  .content_text_tag {
    display: block;
    font-size: 14px !important;
    color: rgb(221, 221, 221);
    width: 96% !important;
    padding: 2px 10px 2px 2px !important;
    text-align: left;
    text-overflow: ellipsis;

    white-space: nowrap;
    overflow: hidden;
  }

  .cus_remark {
    display: block;
    width: 100%;
    padding-left: 3px;
    font-size: 12px;
    color: #999999;
    text-align: left;
  }
}
</style>