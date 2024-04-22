<template>

    <div class="menu_list" v-if="show && menulist.length > 0">
        <div v-for="(item, index) in langList" :key="index" @click="xigua">
            <div class="menu_list_item" @click="getcountry(item)">
                <img style="width:40px;height: 30px;margin-top: 5px;" :src="item.countryImg" alt="">
                <div style="margin-left: 10px;">{{ item.label }}</div>
            </div>
        </div>
    </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import { globalEvent_count } from '../../utils/globalEvent';
export default {
    props: ["show"],
    data() {
        return {
            indexname: "",
            menulist: [],
            currentIndex: null,
            indexId: "",
            limit: 10,
            page: 1,
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
        };
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
        setTimeout(() => {
            this.menulist = this.movietypeList.map(item => {
                return {
                    name: item.name,
                    open: item.open,
                    subMenus: item.children,
                    show: item.show,
                }
            })
        }, 1500);

    },
    mounted() {
      
    },
    methods: {

        ...mapActions(['gelMoveiList','getmovietypeList']),
        xigua() {

        },
        getcountry(row) {
            this.$emit('getcountry', row)
            globalEvent_count.emit('button-clicked_changecountry');
        }

    }
};
</script>

<style lang="less">
/*wrap*/
@media (max-width: 768px) {
    .menu_list {
        width: 200px;
        min-height: 180px;
        max-height: 450px;
        overflow-y: scroll;
        background: linear-gradient(to bottom right, #000, #ffd700);
        position: fixed;
        right: 10px;
        top: 50px;
        border-radius: 7px;
        border: 1px solid #fff;
        color: #fff;
        text-align: left;

        .menu_list_item {
            width: 100%;
            height: 40px;
            padding-left: 20px;
            display: flex;
        }

        .active {
            background-color: #ba7405;
            font-size: 18px;
            font-weight: bold;
            color: #fff;
        }
    }


    .menu {
        padding: 10px;
        cursor: pointer;
    }



    .sub-menu {
        padding: 10px 30px 10px 30px;
        border-bottom: 1px solid goldenrod;
        font-size: 18px;
        font-weight: bold;
        color: #ba7405;
        background-color: #000;
        cursor: pointer;
    }



}

/* PC */
@media (min-width: 768px) {}
</style>