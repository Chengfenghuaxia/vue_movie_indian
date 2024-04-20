<template>
    <div>
        <div class="Nav" v-if="isMobile">
            <div class="Nav_home" @click="gotuhome" style="font-size:20px">
                <span style="color:goldenrod">MISS</span>
                <span style="color:palevioletred">AV</span>
            </div>
            <div class="marquee-container">
                <div class="marquee-content">
                    {{ $t("BranchDomainName") }} : {{ domainName }}</div>
            </div>
            <div :style="{ borderRadius: '50%', width: '30px', height: '30px', overflow: 'hidden', marginLeft: '0px' }"
                @click="opencountryT">
                <img :style="{ width: '50px',marginLeft:'-10px',marginTop:'-2px' }" :src="countryimg.countryImg || rowimg.countryImg" alt="">
            </div>

            <div class="Nav_icon">
                <img @click.stop="opendetail" class="icon_menu" src="../../assets/image/menu.png" alt="">
            </div>
        </div>
        <div class="Nav" v-else>
            <div :style="{ width: '10%' }"></div>
            <!-- <div class="Nav_home" @click="gotuhome">Home</div> -->
            <div class="menulist">
                <el-menu :ellipsis="false" :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
                    @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="home" @click="gotuhome" style="font-size:20px">
                        <span style="color:goldenrod">MISS</span>
                        <span style="color:palevioletred">AV</span>
                    </el-menu-item>
                    <el-sub-menu style="margin-right: 1150px;" :index="index" v-for="(item, index) in movietypeList"
                        :key="index" v-show="item.children">
                        <template #title>{{ item.name }}</template>
                        <el-menu-item :index="subItem.id" v-for="(subItem, subIndex) in item.children"
                            @click="toclassMovie(subItem)" :key="subIndex">{{ subItem.name
                            }}</el-menu-item>

                    </el-sub-menu>
                    <el-sub-menu>
                        <template #title>
                            <img :style="{ width: '30px', marginRight: '10px' }" :src="rowimg.countryImg" alt="">
                        </template>
                        <el-menu-item v-for="(item, index) in langList" :key="index" :index="item.value"
                            @click="changelan(item)" style="font-size:16px">
                            <img :style="{ width: '30px', marginRight: '10px' }" :src="item.countryImg" alt="">
                            <span>
                                {{ item.label }}
                            </span>
                        </el-menu-item>
                    </el-sub-menu>

                </el-menu>
            </div>
            <div class="marquee-container">
                <div class="marquee-content">{{ $t("BranchDomainName") }}:{{ domainName }}</div>
            </div>


        </div>


    </div>
</template>
<script>

import { isMobile } from "../../utils/isMobil";
import { globalEvent } from '../../utils/globalEvent';
import { mapMutations, mapActions, mapState } from 'vuex'
import { useRouter } from 'vue-router';
import { en } from '../../config/config';
import { ApiPost } from "../../utils/request";
export default {
    props: ["countryimg"],
    data() {
        return {
            show: true,
            countryShow: true,
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
            activeIndex2: '1',
            langList: [
                {
                    countryImg: "https://cdn.pixabay.com/photo/2012/04/10/16/14/union-jack-26119_1280.png",
                    value: 'en',
                    label: "English"
                },
                {
                    countryImg: "https://media.istockphoto.com/id/1310357496/photo/china-flag.jpg?s=2048x2048&w=is&k=20&c=ep9KJ7dR-phAxeKkVl6e0E_WIuvl3yRaJiHTFaqnI1s=",
                    value: 'zh-CN',
                    label: "简体中文"
                },
                {
                    countryImg: "https://images.sj33.cn/uploads/allimg/201405/7-140515095310213.png",
                    // value: 'zh-TW',
                    value: 'tw',
                    label: "繁体中文"
                },
                {
                    countryImg: "https://cdn.pixabay.com/photo/2022/05/24/04/47/indian-flag-7217606_640.png",
                    value: 'hi',
                    label: "भारत"
                },
                {
                    countryImg: "https://st.depositphotos.com/1022597/3292/i/950/depositphotos_32924593-stock-photo-flag-of-japan-vignetted.jpg",
                    value: 'ja',
                    label: "日本語"
                },
                {
                    countryImg: "https://cdn.pixabay.com/photo/2013/07/13/14/17/south-korea-162427_1280.png",
                    value: 'ko',
                    label: "대한민국"
                },
                {
                    countryImg: "https://st2.depositphotos.com/1000641/6630/v/950/depositphotos_66300757-stock-illustration-flag-of-brazil.jpg",
                    value: 'es',
                    label: "español"
                },
                {
                    countryImg: "https://www.shutterstock.com/shutterstock/photos/540126295/display_1500/stock-vector-germany-flag-vector-eps-german-flag-germany-flag-icon-540126295.jpg",
                    value: 'de',
                    label: "Deutsch"
                },
                {
                    countryImg: "https://cdn.pixabay.com/photo/2013/07/13/14/16/portugal-162394_1280.png",
                    value: 'pt',
                    label: "Português"
                },
                {
                    countryImg: "https://st4.depositphotos.com/12883492/28907/v/450/depositphotos_289075276-stock-illustration-france-flag-brush-painted-france.jpg",
                    value: 'fr',
                    label: "Français"
                },
                {
                    countryImg: "https://www.shutterstock.com/image-vector/russia-flag-260nw-91811033.jpg",
                    value: 'ru',
                    label: "Русский"
                },
            ],
            rowimg: {},
            domainName: []
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
    created() {
        window.addEventListener('resize', function () {

            this.isMobile = isMobile();

        });
        this.langList.forEach(item => {
            if (item.value === localStorage.getItem('MVlang')) {
                this.rowimg = item
            }
        })
    },
    mounted() {
        this.router = useRouter();
        this.getdomainName()
    },
    methods: {
        async getdomainName() {
            let res = await ApiPost('domain/all')
            res.data.forEach((item, index) => {
                console.log(item);
                this.domainName += `  ${item.name}`
            })
        },
        changelan(item) {
            this.activeIndex2 = ""
            this.rowimg = item
            localStorage.setItem('MVlang', item.value)
            this.gelMoveiList({ page: 1, limit: 12, type: 0 })
            // item.value = item.value === "zh-CN" ? "zh" : item.value
            this.$emit("changelan", item.value)
            this.getmovietypeList({})
        },
        opendetail() {
            this.$emit("opendetail", this.show)
        

        },
        opencountryT() {
            this.$emit("opencountryT", this.countryShow)
        },
        ...mapMutations([
            'setNavigation', // 直接映射
            'setSearch',
            'setVideo',
            'setComics',
            'setNovel',
            'setHD'
        ]),
        ...mapActions(['gelMoveiList','getmovietypeList']),
        async gotuhome() {
            localStorage.removeItem('category_id')
            globalEvent.emit('button-clicked');
            // this.activeIndex2 = ""
            //如果routerInfo有筛选信息，则吧type充值为0 点击home查找所有
            let routerInfo = JSON.parse(localStorage.getItem('routerInfo'))
            if (routerInfo) {
                routerInfo.type = 0

            }

            localStorage.setItem('routerInfo', JSON.stringify(routerInfo))
            await this.gelMoveiList({ page: 1, limit: 12, type: 0 }) //回主页获取所有数据 
            if (this.$route.fullPath != '/index') {
                this.router.push({ path: '/index' });
                this.setNavigation(true)
                window.scrollTo(0, 400);
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
        // PC端点击菜单
        toclassMovie(item) {
            globalEvent.emit('button-clicked');
            localStorage.setItem("routerInfo", JSON.stringify(item));
            localStorage.setItem('category_id', item.id)
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

        .marquee-container {
            width: 50%;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            overflow: hidden;
            white-space: nowrap;

        }

        .marquee-content {
            animation: marquee 6s linear infinite;
            /* 播放动画 */
        }

        @keyframes marquee {
            0% {
                transform: translateX(100%);

                /* 从右边开始 */
            }

            100% {
                transform: translateX(-100%);

                /* 滚动到左边 */
            }
        }

        @keyframes changeColor {
            0% {
                color: red;
            }



            100% {
                color: green;
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

    .arrow {
        margin-right: 20px
    }
}

/* PC */
@media (min-width: 768px) {
    .el-menu--horizontal.el-menu {
        border-bottom: 1px solid #262626;
    }

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
            width: 16%;
            cursor: pointer;
            line-height: 60px;

            justify-content: space-around;
        }

        .marquee-container {
            width: 50%;
            height: 60px;
            line-height: 60px;
            font-size: 24px;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            overflow: hidden;
            white-space: nowrap;
        }

        .marquee-content {
            animation: marquee 15s linear infinite;
            /* 播放动画 */
        }

        @keyframes marquee {
            0% {
                transform: translateX(100%);
                /* 从右边开始 */
            }

            100% {
                transform: translateX(-100%);
                /* 滚动到左边 */
            }
        }



        .abnner {
            width: 50%;
            background-color: red;
            height: 60px;
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
