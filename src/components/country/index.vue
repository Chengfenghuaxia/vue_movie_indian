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

        ...mapActions(['gelMoveiList']),
        xigua() {

        },
        getcountry(row) {
            this.$emit('getcountry', row)
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