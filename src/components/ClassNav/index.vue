<template>
    <div>
        <div class="Classification" v-show="item.show" v-for="(item, index) in movietypeList" :key="index">
            <div class="title">{{ item.title }}</div>
            <div class="item_type">
                <div class="item_type_top">
                    <span v-show="i.show" @click="gotomovie(i)" v-for="(i, k) in item.list1" :key="k">{{ i.name
                        }}</span>

                </div>
                <div class="item_type_bottom">
                    <span v-show="i.show" @click="gotomovie(i)" v-for="(i, k) in item.list2" :key="k">{{ i.name
                        }}</span>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ApiGet } from "../../utils/request";
export default {
    props: ["movietypeList"],
    data() {
        return {

        }

    },
    mounted() { },
    methods: {
        gotomovie(i) {
            this.$emit('getMVdetail', i)
        },
        // 记录广告点击量
        addone(raw) {
            ApiGet("/advertise/addclickstats", { id: raw.id })
        }
    }
}
</script>
<style scoped>
.advertise {
    width: 100%;
    height: 70px;
    background-color: fff;
}

.img {
    width: 100%;
    height: 70px;
}

.Classification {
    width: 100%;
    height: 80px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* margin-top:10px; */
    border-top: 1px solid #ccc;
}

.title {
    width: 22%;
    height: 80px;
    color: #000;
    line-height: 80px
}

.item_type {
    width: 78%;
    height: 80px;
    color: #000;
}

.item_type_top {
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    line-height: 40px;
}

.item_type_bottom {
    height: 40px;
    display: flex;
    /* justify-content: space-around; */
    justify-content: space-around;
    align-items: center;
    line-height: 40px;
}
</style>