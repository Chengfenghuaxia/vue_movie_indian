<template>
    <div class="Nav">
        <div class="content" v-for="(item, index) in NavList" :key="index" @click="handTopSearch(item)"
            :style="{ color: item.color }">{{
            item.nav
        }}</div>
    </div>
</template>
<script>
import { mapMutations, mapActions, useStore } from 'vuex'
import { useRouter } from 'vue-router';
import { ApiPost } from "../../utils/request";
export default {
    data() {
        return {
            NavList: [
                // { nav: '导航', color: 'green' },
                { nav: 'Home', color: 'green' },
                // { nav: '搜索', color: 'red' },
                { nav: 'search', color: 'red' },
                // { nav: '视频', color: 'blue' },
                { nav: 'video', color: 'blue' },
                // { nav: '漫画', color: 'yellow' },
                // { nav: 'cartoon', color: 'yellow' },
                // // { nav: '小说', color: 'pink' },
                // { nav: 'fiction', color: 'pink' },
                // // { nav: '高清', color: 'FFF' }
                { nav: 'high definition', color: 'FFF' }
            ],
            router: {},
            params: {
                limit: 10,
                page: 1,
                type: 0
            }
        }
    },
    mounted() {
        this.router = useRouter();
    },
    methods: {
        ...mapMutations([
            'setNavigation', // 直接映射
            'setSearch',
            'setVideo',
            'setComics',
            'setNovel',
            'setHD'
        ]),
        ...mapActions(['gelMoveiList']),
        async handTopSearch(e) {
            switch (e.nav) {
                case 'Home':
                    if (this.$route.fullPath != '/index') {
                        this.gelMoveiList({ page: 1, limit: 10, type: 0 }) //回主页获取所有数据
                        await this.router.push({ path: '/index' });
                        this.setNavigation(true)
                        window.scrollTo(0, 400);
                    }
                    break;
                case 'search':
                    this.router.push({ path: '/search', });

                    break;
                case 'video':
                    this.setVideo(true)
                    this.router.push({ path: '/filmClassify' })
                    break;
                // case 'cartoon':
                //     this.setComics(true)
                //     this.router.push({ path: '/Ceshi' })
                //     break;
                // case 'fiction':
                //     this.setNovel(true)
                //     this.router.push({ path: '/Ceshi' })
                //     break;
                case 'high definition':
                    this.setHD(true)
                    this.router.push({ path: '/Ceshi' })
            }
        },
        onClickButton(e) {
            console.log(this.value);
        }
    }
}
</script>
<style scoped>
.Nav {
    height: 40px;
    width: 100%;
    line-height: 40px;
    background-color: 000;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.content {
    font-size: block
}
</style>