<template>
    <div class="topNav">
        <div class="topNav_item" :class="{ 'highlight': highlightIndex === index }" v-for="(item, index) in tags"
            :key="index" @mousedown="highlightTag(index)" @mouseup="highlightedTag = null"
            @mouseleave="highlightedTag = null">{{
            item.label }}</div>
    </div>

</template>
<script>
import { ApiPost } from "../../utils/request";
export default {
    data() {
        return {
            highlightIndex: null,
            tags: [
                {
                    label: "Best videos",
                    value: 1
                },
                {
                    label: "Categories",
                    value: 2
                },
                {
                    label: "Indian Image",
                    value: 3
                },
            ]
        }
    },
    mounted() {

    },
    methods: {
        highlightTag(index) {
            this.highlightIndex = index;
            setTimeout(() => {
                this.highlightIndex = null; // 在短暂时间后移除高亮效果
            }, 100); // 设置高亮持续时间为200毫秒
        },
    }
}
</script>
<style scoped lang="less">
.highlight {
    background-color: #ba7405;
}

@media (max-width: 48rem) {
    .topNav {
        width: 100%;
        height: 50px;
        background-color: #000;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-around;
        font-weight: bold;

        .topNav_item {
            line-height: 50px;
        }
    }
}

@media (min-width: 48rem) {
    .topNav {
        width: 100%;
        height: 70px;
        background-color: #000;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-around;
        font-weight: bold;

        .topNav_item {
            line-height: 70px;
        }
    }
}
</style>