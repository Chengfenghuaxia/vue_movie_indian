<template>
  <div class="container">
    <div class="title">
      <span @click="selectTab" :style="{ paddingRight: '20px', fontSize: '16px', fontWeight: 'bold' }">{{ d.title.name
        }}Film</span>
    </div>

    <!--影片列表展示-->
    <div class="content">
      <div class="news">
        <div class="c_nav">
          <span class="c_nav_text silver">Latest release</span>
          <a :href="`/filmClassifySearch?Pid=${d.title.id}&Sort=release_stamp`" class="c_nav_more ">more<b
              class="iconfont icon-more" /></a>
        </div>
        <FilmList :col="7" :list="d.content.news" />
      </div>
      <div class="news">
        <div class="c_nav">
          <span class="c_nav_text silver">Ranking list</span>
          <a :href="`/filmClassifySearch?Pid=${d.title.id}&Sort=hits`" class="c_nav_more ">more<b
              class="iconfont icon-more" /></a>
        </div>
        <FilmList :col="7" :list="d.content.top" />
      </div>
      <div class="news">
        <div class="c_nav">
          <span class="c_nav_text silver">recent updates</span>
          <a :href="`/filmClassifySearch?Pid=${d.title.id}&Sort=update_stamp`" class="c_nav_more ">more<b
              class="iconfont icon-more" /></a>
        </div>
        <FilmList :col="7" :list="d.content.recent" />
      </div>
    </div>

    <!--分页展示区域-->
  </div>
</template>

<script setup lang="ts">

import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import FilmList from "../../components/index/FilmList.vue";


const d = reactive({
  data: {},
  title: { },
  currentIndex: 0,
  content: {
    news: [],
    top: [],
    recent: [],
  }

})

const router = useRouter()
const getFilmData = () => {

}
const selectTab = (index: number) => {
  d.currentIndex = index
}
onMounted(() => {
  getFilmData()
  let query = router.currentRoute.value.query
  if (query.query) {
    d.data = JSON.parse(query.query)
    d.title = JSON.parse(query.value)
  }
})
</script>

<style scoped>
@import "/src/assets/css/classify.css";

.c_nav {
  display: flex;
  justify-content: space-between;

  padding: 6px;
}

.c_nav_text {
  font-weight: 700;
  line-height: 1.1;
}

.c_nav_more {
  background: #25252b;
  border-radius: 8px;
}

.content>div {
  padding-bottom: 20px;
}

/**/
@media (min-width: 768px) {
  .c_nav {
    margin-bottom: 15px;
  }

  .c_nav_text {
    font-size: 28px;
  }

  .c_nav_more {
    font-size: 14px;
    padding: 0 15px;
    line-height: 32px;
  }

}

@media (max-width: 768px) {
  .c_nav {
    margin-bottom: 10px;
  }

  .c_nav_text {
    font-size: 20px;
    line-height: 28px;
  }

  .c_nav_more {
    font-size: 12px;
    padding: 0 10px;
    line-height: 28px;
  }

  .c_nav_more b {
    font-size: 12px;
  }
}
</style>