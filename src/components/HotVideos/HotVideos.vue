<template>
    <div>
        <div class="hot_movies">
            <div class="hot_movies_item" @click="gotoHot(item)" v-for="(item, index) in hotmovieList">
                <div v-if="item.picture" class="left_movie"
                    :style="{ backgroundImage: 'url(' + res_url_prefix + item.picture + ')' }">
                </div>
                <div v-else class="left_movie" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
                <div :style="{ textAlign: 'left', fontSize: '.6875rem', color: '#000' }">{{ truncatedText(item.name) }}
                </div>
                <span :style="{ textAlign: 'left', fontSize: '.6875rem', color: '#000' }">Release date：{{
                fmtDate(item.release_time)
            }}</span>
            </div>

        </div>
        <div ref="observerElement">Loading more...</div>
    </div>

</template>
<script>
import { mapState } from 'vuex'
export default {

    props: ['HotVideoList'],
    data() {
        return {
            hotmovieList: [],
            imageUrl: 'require(../../assets/image/images.jpg)',
            maxLength: 10, // 最大显示长度
            limit: 0,
            page: 0
        }

    },
    mounted() {
        // this.loadMore(); // 初始加载数据
        this.observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                this.limit += 1;
                this.page += 1;
                this.loadMore(this.limit, this.page);
            }
        });
        this.observer.observe(this.$refs.observerElement);
    },
    computed: {
        hotmovieList() {
            return this.HotVideoList
        },
        ...mapState({
            res_url_prefix: state => state.res_url_prefix,
        }),
    },
    methods: {
        truncatedText(text) {
            if (text.length > this.maxLength) {
                return text.substring(0, this.maxLength) + '...';
            } else {
                return text;
            }
        },
        fmtDate(time) {
            let T = (time + '').length > 11 ? time : time * 1000
            const date = new Date(T);
            return date.getFullYear() + '-' +
                ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                ('0' + date.getDate()).slice(-2);
        },
        gotomovie(i) {
            console.log(i);
        },
        gotoHot(item) {
            this.$emit('ChangeHotvideo', item)
        },
        //处理加载更多逻辑
        loadMore(limit, page) {
            this.$emit('getMoviedata', { limit, page })
        }
    }
}
</script>
<style scoped lang="less">
/* 移动端 */
@media (max-width: 768px) {
    .hot_movies {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        justify-content: flex-start;
        margin-bottom: 10px;
        margin-top: 10px;
    }

    .hot_movies_item {

        margin-bottom: 90px;
        width: 45%;
        margin-left: 5%;
        height: 70px;

    }

    .left_movie {
        width: 90%;
        height: 100px;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 100px;
        background-image: url('../../assets/image/images.jpg');
        background-size: cover;
        background-position: center;
    }

    img {
        width: 100%;
        height: 98px;
    }

    .movieTitle {
        font-size: 12px;

    }
}

/* PC端 */
@media (min-width: 768px) {
    .hot_movies {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        justify-content: flex-start;
        margin-bottom: 10px;
        margin-top: 10px;
    }

    .hot_movies_item {
        margin-bottom: 90px;
        width: 25%;
        height: 120px;
    }

    .left_movie {
        width: 90%;
        height: 150px;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 150px;
        background-image: url('../../assets/image/images.jpg');
        background-size: cover;
        background-position: center;
    }

    img {
        width: 100%;
        height: 15px;
    }

    .movieTitle {
        font-size: 12px;

    }

}
</style>