<template>
    <div>

        <div class="box">
            <div class="Tabs" :class="{ 'active': currentIndex === index }" v-for="(item, index) in areaList"
                :key="index" @click="selectTab(item,index)">
                <span> {{ item.name }}</span>
            </div>
        </div>
    </div>

</template>
<script>
import { ApiPost } from "../../utils/request";
export default {
    data() {
        return {
            value: "",
            areaList: ['最新', '最多', '最好', '推荐'],
            currentIndex: '',
        }
    },
    mounted() {
        this.getAreaList()
    },
    methods: {
        async getAreaList() {
            let res = await ApiPost('/area/all', '')
            this.areaList = res.data
        },
        selectTab(row,index) {
            this.currentIndex = index;
            this.$emit('selectTab', row)
        },
        onSearch(e) {
            console.log(e);
        }
    }
}
</script>
<style scoped>
.box {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.Tabs {
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    background-color: #ba7405;
    font-weight: bold;
    color: white;
    font-family: 'Courier New', Courier, monospace;
}

.active {
    color: rgb(37, 11, 156);
    /* Highlight color */
}
</style>