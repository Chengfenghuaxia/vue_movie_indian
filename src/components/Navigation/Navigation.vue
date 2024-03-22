<template>
    <div class="Nav">
        <div class="content" v-for="(item, index) in NavList" :key="index" @click="handTopSearch(item)"
            :style="{ color: item.color }">{{
            item.nav
        }}</div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { useRouter } from 'vue-router';
export default {
    data() {
        return {
            NavList: [
                // { nav: '导航', color: 'green' },
                { nav: 'nav', color: 'green' },
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
            router: {}
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
        async handTopSearch(e) {
            console.log(111111)
            switch (e.nav) {
                case 'nav':
                    await this.router.push({ path: '/index', });
                    this.setNavigation(true)
                    window.scrollTo(0, 400);
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