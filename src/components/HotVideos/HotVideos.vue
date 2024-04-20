<template>
    <div>
        <div class="hot_movies">
            <div class="hot_movies_item" @click="gotoHot(item)" v-for="(item, index) in hotmovieList">
                <div class="play_duration">{{ formatTime(item.play_duration) }}</div>
                <div v-if="item.picture" class="left_movie"
                    :style="{ backgroundImage: 'url(' + res_url_prefix + item.picture + ')' }">
                </div>
                <div v-else class="left_movie" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
                <div :style="{ textAlign: 'left', fontSize: '16px', color: '#fff' }">{{ truncatedText(item.name) }}
                </div>
                <span :style="{ textAlign: 'left', fontSize: '14px', color: '#fff' }">{{
                    fmtDate(item.release_time)
                }}</span>
            </div>

        </div>
        <!-- <div ref="observerElement">Loading more...</div> -->
    </div>

</template>
<script>
import { mapState } from 'vuex'
import { isMobile } from "../../utils/isMobil";
export default {

    props: ['HotVideoList'],
    data() {
        return {
            hotmovieList: [],
            imageUrl: 'require(../../assets/image/images.jpg)',
            maxLength: 9, // 最大显示长度
            limit: 0,
            page: 0
        }

    },
    created() {
        if (isMobile()) {
            this.maxLength = 9
        } else {
            this.maxLength = 30
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
        // this.observer.observe(this.$refs.observerElement);
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
            let T = (time + '').length > 11 ? time : time * 1000;
            const date = new Date(T);
            return ('0' + date.getDate()).slice(-2) + '/' +
                ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
                date.getFullYear();
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
        },
        formatTime(seconds) {
            // 计算小时、分钟和秒数
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;

            // 格式化为字符串
            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(remainingSeconds).padStart(2, '0');

            // 返回格式化后的时间字符串
            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        },
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
        color: #fff
    }

    .hot_movies_item {

        margin-bottom: 90px;
        width: 45%;
        margin-left: 5%;
        height: 70px;
        position: relative;

        .play_duration {
            width: 70px;
            height: 24px;
            background-color: rgba(0, 0, 0, 0.5);
            position: absolute;
            bottom: -20px;
            right: 30px;
            border-radius: 9px;

        }
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
        position: relative;

        .play_duration {
            width: 70px;
            height: 24px;
            background-color: rgba(0, 0, 0, 0.5);
            position: absolute;
            bottom: -20px;
            right: 40px;
            border-radius: 9px;

        }
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