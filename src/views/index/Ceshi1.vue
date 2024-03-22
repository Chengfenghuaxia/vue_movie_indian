<template>
  <div class="title">
    {{ title }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      title:"Not yet open"
    }
  }
}
</script>
<style  scoped>
  .title{
    line-height: 50vh;
    font-size: 30px;
    font-weight: 700;
    color:#ccc
  }
</style>