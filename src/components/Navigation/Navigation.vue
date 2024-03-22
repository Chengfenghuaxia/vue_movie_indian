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
                { nav: '导航', color: 'green' },
                { nav: '搜索', color: 'red' },
                { nav: '视频', color: 'blue' },
                { nav: '漫画', color: 'yellow' },
                { nav: '小说', color: 'pink' },
                { nav: '高清', color: 'FFF' }
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
            switch (e.nav) {
                case '导航':
                    await this.router.push({ path: '/index', });
                    this.setNavigation(true)
                    window.scrollTo(0, 400);
                    break;
                case '搜索':
                    this.router.push({ path: '/search', });

                    break;
                case '视频':
                    this.setVideo(true)
                    this.router.push({ path: '/filmClassify' })
                    break;
                case '漫画':
                    this.setComics(true)
                    this.router.push({ path: '/Ceshi' })
                    break;
                case '小说':
                    this.setNovel(true)
                    this.router.push({ path: '/Ceshi' })
                    break;
                case '高清':
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