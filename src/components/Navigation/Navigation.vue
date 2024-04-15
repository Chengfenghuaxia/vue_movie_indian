<template>
    <div>
        <div class="Nav" v-if="isMobile">
            <div class="Nav_home" @click="gotuhome">Home</div>
            <div class="Nav_search" >
                <img @click="searchMovie" :style="{width:'20px',height:'20px',marginTop:'20px'}" src="../../assets/image/search1.png" alt="">

            </div>
            <div class="Nav_icon">
                <img @click.stop="opendetail" class="icon_menu" src="../../../public/menu.png" alt="">
            </div>
        </div>
        <div class="Nav" v-else>
            <div :style="{ width: '10%' }"></div>
            <div class="Nav_home" @click="gotuhome">Home</div>
            <i class="fas fa-heart"></i> <!-- 使用 Font Awesome 图标 -->
            <div class="menulist">
                <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
                    <el-sub-menu :index="index" v-for="(item, index) in movietypeList" :key="index"
                        v-show="item.children">
                        <template #title>{{ item.name }}</template>
                        <el-menu-item :index="subItem.id" v-for="(subItem, subIndex) in item.children"
                            @click="ceshi(subItem)" :key="subIndex">{{ subItem.name
                            }}</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>

            <div class="search" @click.stop="searchMovie">
                <img src="../../assets/image/search1.png" alt="">
                <div>search</div>
            </div>

        </div>


    </div>
</template>
<script>

import { isMobile } from "../../utils/isMobil";
import { mapMutations, mapActions, mapState } from 'vuex'
import { useRouter } from 'vue-router';
import { en } from '../../config/config';
export default {
    data() {
        return {
            show: true,
            router: {},
            currentIndex: "",
            params: {
                limit: 10,
                page: 1,
                type: 0
            },
            lang: en.tab,
            isMobile: isMobile(),
            activeIndex: '1',
            activeIndex2: '1'
        }
    },
    computed: {
        ...mapState({
            movietypeList: state => state.movietypeList.map(item => {
                return {
                    ...item,
                    open: false
                }
            }),
        }),
    },
    mounted() {
        this.router = useRouter();

    },
    methods: {
        opendetail() {
            this.$emit("opendetail", this.show)
         
        },

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
                case '首页':
                    if (this.$route.fullPath != '/index') {
                        this.gelMoveiList({ page: 1, limit: 12, type: 0 }) //回主页获取所有数据
                        await this.router.push({ path: '/index' });
                        this.setNavigation(true)
                        window.scrollTo(0, 400);
                    } else {
                        this.gelMoveiList({ page: 1, limit: 12, type: 0 }) //回主页获取所有数据 
                    }
                    break;
                case 'search':
                case '搜索':
                    this.router.push({ path: '/search', });

                    break;
                case 'Ranking':
                case '排行':
                    this.setVideo(true)
                    this.router.push({ path: '/filmClassify' })
                    break;
                case 'menu':
                    console.log(e);
                    break;

                case 'HD_movie':
                case '高清电影':
                    this.setHD(true)
                    this.router.push({ path: '/Ceshi' })
            }
        },
        async gotuhome() {
            if (this.$route.fullPath != '/index') {
                this.gelMoveiList({ page: 1, limit: 12, type: 0 }) //回主页获取所有数据
                await this.router.push({ path: '/index' });
                this.setNavigation(true)
                window.scrollTo(0, 400);
            } else {
                this.gelMoveiList({ page: 1, limit: 12, type: 0 }) //回主页获取所有数据 
            }

            if (!this.isMobile) {
                this.activeIndex2 = 0
            }
        },
        searchMovie() {
            this.router.push({ path: '/search', });
        },
        onClickButton(e) {
            console.log(this.value);
        },
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },
        ceshi(item) {
            this.gelMoveiList({ category_id: item.id, page: 1, limit: 12, type: 2 })
        }
    }
}
</script>
<style scoped lang="less">

/*wrap*/
@media (max-width: 768px) {
    .Nav {
        height: 40px;
        width: 100%;
        line-height: 40px;
        background-color: 000;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .Nav_home {
            padding-left: 10px;
     
        }

        .Nav_search {
                   img{
                margin-left: 240px;
            }
        }


    }

    .icon_menu {
        height: 26px;
        margin-top: 3px;
        float: right;
        margin-right: 10px;
    }


    .content {
        font-size: block;
        width: 33%;
        color: #fff;
    }

    .active {
        display: inline;
        font-weight: bold;
        height: 40px;
        background-color: #ba7405;
    }
 
   .arrow{
    margin-right:20px
   }
}

/* PC */
@media (min-width: 768px) {
    .Nav {
        width: 100%;
        height: 65px;
        display: flex;

        .Nav_home {
            width: 10%;
            cursor: pointer;
            line-height: 60px;
            text-align: center;
        }

        .menulist {
width: 50%;
            cursor: pointer;
            line-height: 60px;
            display: flex;
            justify-content: space-around;
        }

        .search {
            width: 10%;
            cursor: pointer;
            line-height: 60px;
        display: flex;
            img {
                width: 22px;
                height: 22px;
                margin-top: 20px;
            }
        }

    }

    .el-menu {
        /* 修改 el-menu 的背景颜色 */
        background-color: rgb(38, 38, 38) !important;

    }

    .el-menu-item {
        /* 修改 el-menu-item 的字体颜色 */
        background-color: transparent !important;
    }



    .menu-title {
        /* 修改标题的字体颜色 */
        color: #fff;
        font-size: 16px;
        font-weight: bold;
    }



}
</style>
<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>