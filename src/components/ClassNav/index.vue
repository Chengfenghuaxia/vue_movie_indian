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
    height: 4.375rem;
    background-color: fff;
}

.img {
    width: 100%;
    height: 4.375rem;
}

.Classification {
    width: 100%;
    height: 5rem;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* margin-top:.625rem; */
    border-top: .0625rem solid #ccc;
}

.title {
    width: 22%;
    height: 5rem;
    color: #000;
    line-height: 5rem
}

.item_type {
    width: 78%;
    height: 5rem;
    color: #000;
}

.item_type_top {
    height: 2.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    line-height: 2.5rem;
    font-size: .875rem;
}

.item_type_bottom {
    height: 2.5rem;
    display: flex;
    /* justify-content: space-around; */
    justify-content: space-around;
    align-items: center;
    line-height: 2.5rem;
    font-size: .875rem;
}
</style>