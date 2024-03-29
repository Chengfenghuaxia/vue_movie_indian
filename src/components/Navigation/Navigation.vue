<template>
    <div class="Nav">
        <div class="content" :class="{ 'active': currentIndex === index }" v-for="(item, index) in NavList" :key="index"
            @click="handTopSearch(item, index)">

           {{ item.nav}}
        </div>
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
                
                { nav: 'Home', color: '#ba7405' },
                { nav: 'search', color: '#ba7405' },
                { nav: 'video', color: '#ba7405' },
                { nav: 'high definition', color: '#ba7405' },
            ],
            router: {},
            currentIndex: "",
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
        async handTopSearch(e, index) {
            this.currentIndex = index;
            switch (e.nav) {
                case 'Home':
                    if (this.$route.fullPath != '/index') {
                        this.gelMoveiList({ page: 1, limit: 12, type: 0 }) //回主页获取所有数据
                        await this.router.push({ path: '/index' });
                        this.setNavigation(true)
                        window.scrollTo(0, 400);
                    }else{
                        this.gelMoveiList({ page: 1, limit: 12, type: 0 }) //回主页获取所有数据 
                    }
                    break;
                case 'search':
                    this.router.push({ path: '/search', });

                    break;
                case 'video':
                    this.setVideo(true)
                    this.router.push({ path: '/filmClassify' })
                    break;
                case 'menu':
                   console.log(e);
                    break;
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
    font-size: block;
    color: #fff;
}

.active {
    width: 100px;
    height: 40px;
    background-color: #ba7405;
}
</style>