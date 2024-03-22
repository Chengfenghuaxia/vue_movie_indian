<template>
  <div class="relate_container">
    <p class="title">相关推荐</p>
          <HotVideos @ChangeHotvideo="handTohotMovie" />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import HotVideos from "../../components/HotVideos/HotVideos.vue";
const data = reactive({
  currentPage: 1,
  pageSize: 5,
  total: 100,
})
defineProps({
  relateList: Array
})

const handTohotMovie = (e) => {
  router.push({ path: '/play', query: e });
}
</script>

<style scoped>
@media (max-width: 768px) {
  .title {
    font-size: 20px;
    margin-left: 20px;
  }
}

@media (min-width: 768px) {
  .title {
    font-size: 24px;
  }
}

.relate_container {
  width: 100%;
  margin-top: 36px;

}

.title {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.55);
  text-align: left;
  border-bottom: 2px solid rgba(255, 255, 255, 0.12);
}

.RecpmmendList {
  width: 94%;
  height: 30px;
  line-height: 30px;
  text-align: left;
  border-bottom: 1px solid #ccc;
  margin-left: 2%;
  /* background-color: blueviolet; */
}

.left_title {
  padding-left: 20px;
}

.right_time {
  padding-left: 20px;
}

.pagination {
  margin-top: 10px;
}
</style>