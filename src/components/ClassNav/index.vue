<template>
    <div>
        <div class="Classification" v-show="item.show" v-for="(item, index) in movietypeList" :key="index">
            <div class="title">{{ item.title }}</div>
            <div class="item_type">
                <div class="item_type_item" :class="{ 'active': currentIndex === k && indexNmae == i.name }"
                    v-for="(i, k) in item.list" :key="k" @click="gotomovie(i, k)">
                    {{ i.name }}
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { ApiGet } from "../../utils/request";
import { useRouter } from 'vue-router';
export default {
    props: ["movietypeList"],
    data() {
        return {
            currentIndex: "",
            indexNmae: ""
        }

    },
    mounted() {

    },
    methods: {
        gotomovie(i, index) {
            if (!this.$route.fullPath.includes('/index')) {
                this.$router.push({ path: '/index', query: i });
            }
            if ((this.currentIndex===0||this.currentIndex) && this.indexNmae && i.name == this.indexNmae) {
                i.type = 0
                this.$emit('getMVdetail', i)
                this.currentIndex = ""
                this.indexNmae = ""
            } else {
                i.type = 2
                this.currentIndex = index
                this.indexNmae = i.name
                this.$emit('getMVdetail', i)
            }

        },

    }
}
</script>
<style scoped lang="less">
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
    height: 6rem;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* margin-top:.625rem; */
    border-top: .0625rem solid #ccc;
}

.title {
    width: 20%;
    height: 6rem;
    color: #000;
    line-height: 5rem
}

.item_type {
    width: 80%;
    height: 6rem;
    color: #000;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    .item_type_item {
        height: 2.5rem;
        width: 24%;
        border: .0625rem solid #ccc;
        border-radius: .3125rem;
        line-height: 2.5rem;
        font-size: .875rem;
        text-align: center;
        line-height: 2.5rem;
        font-size: .875rem;
        margin-right: 3px;

    }
}

.active {
    background-color: #ba7405;
    color: #fff;
}
</style>