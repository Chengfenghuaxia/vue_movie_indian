<template>

    <div class="menu_list" v-if="show && menulist.length > 0">
        <div v-for="(menu, index) in menulist" :key="index">
            <div class="menu" @click="toggleSubMenu(index)"
                :style="{ display: 'flex', justifyContent: 'space-between' }">
                <div>{{ menu.name }} </div>
                <div v-if="menu.subMenus && menu.subMenus.length > 0" class="arrow">
                    <img v-if="menu.open" :style="{ width: '14px', marginRight: '10px' }"
                        src="../../assets/image/top.png" alt="">
                    <img v-else :style="{ width: '14px', marginRight: '10px' }" src="../../assets/image/donw.png"
                        alt="">
                </div>
            </div>
            <div v-if="menu.open" class="submenu">
                <div v-for="(subMenu, subIndex) in menu.subMenus" :key="subIndex" class="sub-menu"
                    :class="{ 'active': (currentIndex == subIndex) && subMenu.id == indexId }"
                    @click="filterList(subMenu, subIndex)">
                    {{ subMenu.name }}
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import { useStore } from 'vuex';
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

        };
    },
    computed: {
        ...mapState({
            movietypeList: state => state.movietypeList.map(item => {
                return {
                    ...item,
                    open: true
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
        ...mapActions(['gelMoveiList', 'getmovietypeList']),
        //国家选择组件选择语言后通知菜单组件更新语言显示 涉及组件通信
        listrend() {
            this.getmovietypeList({})
            setTimeout(() => {
                this.menulist = this.movietypeList.map(item => {
                    return {
                        name: item.name,
                        open: item.open,
                        subMenus: item.children,
                        show: item.show,
                    }
                })

            }, 800);


        },
        filterList(info, index) {
            if ((this.currentIndex === 0 || this.currentIndex) && this.indexId && info.name == this.indexId) {
                this.currentIndex = null
                this.indexId = ""
                info.type = 0
            } else {
                info.type = 2
                this.currentIndex = index
                this.indexId = info.id
            }
            info.limit = this.limit
            info.page = this.page
            console.log(info, '查看具体详情');
            localStorage.setItem("routerInfo", JSON.stringify(info));
            localStorage.setItem('category_id', info.id)
            this.$router.push({ path: `/index/${info.name}` });
            // 点击筛选后关闭弹窗
            this.$emit("closedetail", false)
        },
        toggleSubMenu(index) {
            this.menulist.forEach((menu, i) => {
                if (i === index) {
                    this.indexname = menu.name
                    if (typeof menu.open === 'undefined') {
                    } else {
                        menu.open = !menu.open;
                    }
                } else {
                    menu.open = false;
                }
            });
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
            padding-left: 10px;
            line-height: 40px;
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