<template>
    <div class="container">
        <div class="search_group">
            <input v-model="data.search" @keydown="e => { e.keyCode == 13 && searchMovie() }"
                :placeholder="$t('placeSearch')" class="search" />
            <el-button @click="searchMovie" :icon="Search" style="" />

        </div>
        <div v-if="data.searchHistory1.length > 0"
            :style="{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }">
            <img src="../../assets/image/delete.png" @click="deletehistory"
                :style="{ width: '20px', height: '20px', marginLeft: '20PX' }" alt="">
        </div>
        <div class="quick_search">
            <div class="searchHistorys" v-if="data.searchHistory1.length > 0">
                <div class="History_list">{{ $t('historylist') }}</div>

                <div>
                    <div @click="HistorySearch(item, 0)" v-for="(item, index) in data.searchHistory1" :key="index"
                        class="tag">
                        {{ item }}</div>

                </div>
            </div>
            <div class="fenge"></div>
            <div class="hotsearch">
                <div class="Hot_list">{{ $t('hotsearch') }}</div>
                <div>
                    <div @click="HistorySearch(item.id, 1)" v-for="(item, index) in data.tagList" :key="index"
                        class="tag">
                        {{ item.value }}</div>

                </div>
            </div>
        </div>

        <div v-if="data.list && data.list.length > 0" class="search_res">
            <div class="title">
                <h2>{{ data.oldSearch }}</h2>
                <p :style="{ color: '#000' }">All found{{ data.page.total }}fikms and"{{ data.oldSearch }}"Related film
                    and television works</p>
            </div>
            <div class="content">
                <div class="film_item" v-for="m in data.list">
                    <span :style="{ backgroundImage: `url('${data.res_url_prefix + m.picture}')` }"></span>
                    <div class="film_intro">
                        <h3>{{ truncatedText(m.name) }}</h3>
                        <p class="tags">
                            <span class="tag_c">{{ m.language }}</span>
                            <span>{{ fmtrelease(m.release_time) }}</span>
                            <span>{{ m.area }}</span>
                        </p>
                        <!-- <p><em>Type:</em>{{ m.tags }}</p> -->

                        <div class="video_tags">
                            <div class="video_tags_item" v-for="(item, index) in m.tags" :key="index">
                                {{ item }}</div>
                        </div>


                        <p><em>{{ $t("Protagonist") }}:</em>{{ m.actor }}</p>
                        <p class="blurb"><em>plot:</em>{{ m.blurb.replaceAll('　　', '') }}</p>
                        <el-button :icon="CaretRight" @click="play(m)">{{ $t("playNow") }}</el-button>
                    </div>
                </div>
            </div>
            <div class="pagination_container">
                <el-pagination class="my-pagination" @current-change="changeCurrent"
                    :style="{ float: 'right', right: '3.125rem' }" v-model:current-page="data.page.current"
                    :page-size="data.page.pageSize" :current-page="data.page.current" layout="prev, pager, next"
                    :total="data.page.total" />
            </div>
        </div>

    </div>
    <el-empty v-if="data.oldSearch != '' && (!data.list || data.list.length == 0)" description="未查询到对应影片" />
</template>

<script lang="ts" setup>
import { isMobile } from "../../utils/isMobil";
import { onMounted, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ApiPost } from "../../utils/request";
import { CaretRight, Search } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";
import { useStore } from 'vuex';
import { globalEvent_count,globalEvent_count_PC } from '../../utils/globalEvent';
const store = useStore();
const router = useRouter()
const route = useRoute()
const data = reactive({
    searchHistory: "",
    searchHistory1: JSON.parse(localStorage.getItem('searchHistory')) || [],
    showSuggestions: false,
    mouseDownOnSuggestions: false,
    list: [],
    page: {
        current: 1,
        total: 0,
        pageSize: 10
    },
    oldSearch: '',
    // search: '',
    search: "",
    Hvideolist: [],
    res_url_prefix: computed(() => store.state.res_url_prefix),
    tagList: [],
    type: 0,
    data1: {},
    tag_id: ""
})
// 监听路由参数的变化


// 点击播放
const play = async (e: string | number) => {
    let res = await ApiPost('/movie/getmovieinfo', { id: (e as any).id })
    let data = {
        query: e,
        movieinfo: (res as any).data
    }
    await router.push({ path: '/play' });
    store.commit('setMovieInfo', data)
    // window.scrollTo(0, 500);
}
const getList = (current: number, page: number, name: string, tag_id: string, type: number) => {
    data.page.current = current
    let query = {
        name,
        tag_id,
        page,
        limit: 10,
        type
    }
    ApiPost('/movie/pagebyname', query).then((resp: any) => {
        if (data.type == 0) {
            const index = data.searchHistory1.indexOf(data.search);
            if (index !== -1) {
                data.searchHistory1.splice(index, 1);
            }
            if (data.search) {
                data.searchHistory1.unshift(data.search);
            }

            // 如果搜索记录超过10条，则移除最旧的一条记录
            let num = isMobile() ? 10 : 20
            if (data.searchHistory1.length > num) {
                data.searchHistory1.pop();
            }
            localStorage.setItem('searchHistory', JSON.stringify(data.searchHistory1));
        }

        if (resp.code == 0) {
            data.list = resp.data.list
            data.page.total = resp.data.total
        } else {
            ElMessage.warning({ message: resp.msg, duration: 1000 })
        }

    })
}

const getTags = () => {
    ApiPost('/tag/all', {}).then(res => {
        data.tagList = (res as any).data
    })
}
// 搜索按钮事件
const searchMovie = () => {
    if (data.search.length <= 0) {
        ElMessage.error({ message: 'Can not be empty', duration: 1000 })
        return
    }
    data.page.current = 1
    data.tag_id = ""
    getList(data.page.current, 1, data.search, "", data.type)

}

const fmtrelease = (time) => {
    let T = (time + '').length > 11 ? time : time * 1000;
    const date = new Date(T);
    return ('0' + date.getDate()).slice(-2) + '/' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
        date.getFullYear();

}
const truncatedText = (text) => {
    if (text.length > 15) {
        return text.substring(0, 20) + '...';
    } else {
        return text;
    }
}
const HistorySearch = (IN, type) => {
    let IN1 = ""
    let IN2 = ""
    if (type == 0) {
        data.search = IN
        data.tag_id = ""
        data.type = 0
        IN1 = IN
        IN2 = ""
    } else {
        data.tag_id = IN
        data.search = ""
        data.type = 1
        IN1 = ""
        IN2 = IN
    }

    getList(1, 1, IN1, IN2, type)
    data.showSuggestions = false;
}
const deletehistory = () => {
    localStorage.removeItem('searchHistory');
    data.searchHistory1 = []
}


onMounted(() => {
    //来自移动端的监听
    globalEvent_count.on('button-clicked_changecountry', () => {
        getList(data.page.current, data.page.current, data.search, data.tag_id, data.type)
    });
      //来自移PC的监听
    globalEvent_count_PC.on('button-clicked_changecountry1', () => {
        getList(data.page.current, data.page.current, data.search, data.tag_id, data.type)

    });
    let query = route.query
    data.search = (query.search as string)
    getList(1, 1, data.search, data.tag_id, data.type)
    getTags()
})
// 分页器
const changeCurrent = (currentVal: number) => {
    getList(currentVal, currentVal, data.search, data.tag_id, data.type)
    data.page.current = currentVal
}

</script>

<!--移动端-->
<style scoped lang="less">
@import "/src/assets/css/pagination.css";

//修改分页样式
.my-pagination::v-deep {
    .el-pager li.is-active {
        background-color: #8d14d3 !important;
        border-color: #8d14d3 !important;
        color: #fff !important;
    }
}


@media (max-width: 768px) {

    .container {
        width: 100%;

        .quick_search {


            .searchHistorys {
                width: 96%;
                margin-left: 2%;
                min-height: 40px;
                margin-top: 5px;
                text-align: left;

                .History_list {
                    text-align: left;
                    border-bottom: 1px solid goldenrod;
                }
            }



            .hotsearch {
                width: 96%;
                margin-left: 2%;
                min-height: 40px;
                margin-top: 20px;

                text-align: left;

                .Hot_list {
                    text-align: left;
                    border-bottom: 1px solid goldenrod;
                }
            }
        }
    }


    .title h2 {
        margin: 8px auto;
    }

    .film_item {
        flex-basis: calc(100% - 20px);
        margin: 0 10px 25px 10px;
        display: flex;
        background: #2e2e2e;
        padding: 10px;
        min-height: 180px;
        max-height: 200px;
        border-radius: 16px;
    }

    .film_item span {

        flex: 2;
        border-radius: 8px;
        background-size: cover;
    }

    .film_intro {
        max-width: 60%;
        margin-left: 10px;
        flex: 3;
        text-align: left;
        padding: 0 10px;
        font-size: 15px;
        position: relative;
    }

    .film_intro h3 {
        font-size: 16px;

        font-weight: bold;
    }

    .film_item h3,
    p,
    button {
        margin: 2px 0 2px 0;
    }

    .film_item p {
        max-width: 90%;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 13px;

    }

    .film_item p em {
        font-weight: bold;
        margin-right: 8px;
    }

    .film_item button {
        background-color: orange;
        border-radius: 20px;
        border: none !important;
        color: #ffffff;
        font-weight: bold;
        position: absolute;
        margin-bottom: 2px;
        bottom: 0;
    }

    .blurb {
        display: none !important;
    }

    .tags {
        display: flex;
        width: 90%;
        justify-content: space-between;
    }

    .tags .tag_c {
        background: rgba(155, 73, 231, 0.72);
    }

    .tags span {
        border-radius: 5px;
        padding: 3px 5px;
        background: rgba(66, 66, 66);
        color: #c9c4c4;
        margin-right: 5px;
    }

    .search_group {
        width: 80%;
        margin: 0 auto;
        display: flex;
        margin-top: 30px;
    }

    .search {
        flex: 10;
        background-color: #2e2e2e !important;
        border: none !important;
        height: 40px;
        border-radius: 6px 0 0 6px;
        padding-left: 20px;
        color: #c9c4c4;
        font-size: 15px;
        font-weight: bold;
    }

    .search::placeholder {
        font-size: 15px;
        color: #999999;
    }

    .search:focus {
        outline: none;
    }

    .search_group button {
        flex: 1;
        margin: 0;
        background-color: #2e2e2e;
        color: rgba(155, 73, 231, 0.72);
        border: none !important;
        height: 40px;
        border-radius: 0 8px 8px 0;
        font-size: 20px;
        /*margin-bottom: 2px*/
    }

    .video_tags {
        width: 100%;
        height: 1.5rem;
        font-size: 14px;
        line-height: 1.5rem;
        display: flex;
        justify-content: space-around;

        .video_tags_item {
            background-color: #ba7405;
            padding: 0 .3125rem;
            border-radius: .3125rem;
        }
    }

    .tag {
        display: inline-block;
        padding: 6px 12px;
        margin: 4px;
        background-color: #2e2e2e;
        border-radius: 4px;
        font-size: 12px;
        text-align: left;
    }
}
</style>
<!--pc端-->
<style scoped lang="less">
.title {
    margin-bottom: 20px;
}



.content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.search_res {
    width: 100%;
}


@media (min-width: 768px) {
    .container {
        width: 100%;

        .quick_search {
            display: flex;

            .searchHistorys {
                width: 46%;
                min-height: 40px;
                margin-top: 20px;
                text-align: left;

                .History_list {
                    text-align: left;
                    border-bottom: 1px solid goldenrod;
                }
            }

            .fenge {
                width: 4%;
                height: 100px;
                margin-top: 20px;
                border-right: 1px solid #2e2e2e;
            }

            .hotsearch {
                width: 46%;
                min-height: 40px;
                margin-top: 20px;
                margin-left: 4%;
                text-align: left;

                .Hot_list {
                    text-align: left;
                    border-bottom: 1px solid goldenrod;
                }
            }
        }
    }

    .film_item {
        flex-basis: calc(50% - 18px);
        max-width: 50%;
        display: flex;
        background: #2e2e2e;
        padding: 16px;
        min-height: 250px;
        max-height: 280px;
        border-radius: 16px;
        margin-bottom: 25px;
    }

    .film_item span {
        flex: 1;
        border-radius: 8px;
        background-size: cover;
    }

    .film_intro {
        max-width: 75%;
        margin-left: 10px;
        flex: 2;
        /*flex-grow: 4;*/
        text-align: left;
        padding: 0 10px;
        font-size: 15px;
        position: relative;
    }

    .film_item h3,
    p,
    button {
        margin: 3px 0 12px 0;
    }

    .film_item p {
        max-width: 90%;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .film_item p em {
        font-weight: bold;
        margin-right: 8px;
    }

    .film_item button {
        background-color: orange;
        border-radius: 20px;
        border: none !important;
        color: #ffffff;
        font-weight: bold;
        position: absolute;
        margin-bottom: 2px;
        bottom: 0;
    }

    .tags {
        display: flex;
        width: 90%;
        justify-content: space-between;
    }

    .tags .tag_c {
        background: rgba(155, 73, 231, 0.72);
    }

    .tags span {
        border-radius: 5px;
        padding: 3px 5px;
        background: rgba(66, 66, 66);
        color: #c9c4c4;
        margin-right: 10px;
    }

    .search_group {
        width: 45%;
        margin: 20px auto;
        display: flex;
        margin-top: 30px;
    }

    .search {
        flex: 10;
        background-color: #2e2e2e !important;
        border: none !important;
        height: 40px;
        border-radius: 6px 0 0 6px;
        padding-left: 20px;
        color: #c9c4c4;
        font-size: 15px;
        font-weight: bold;
    }

    .search::placeholder {
        font-size: 15px;
        color: #999999;
    }

    .search:focus {
        outline: none;
    }

    .search_group button {
        flex: 1;
        margin: 0;
        background-color: #2e2e2e;
        color: rgba(155, 73, 231, 0.72);
        border: none !important;
        height: 40px;
        border-radius: 0 6px 6px 0;
        font-size: 20px;
    }

    .tag {
        display: inline-block;
        padding: 6px 12px;
        margin: 4px;
        background-color: #2e2e2e;
        border-radius: 4px;
        font-size: 12px;
        text-align: left;
    }
}
</style>
