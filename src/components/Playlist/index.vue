<template>
    <div class="play_list">
        <div class="play_list_item" v-for="(item, index) in HomeList" :key="index" @click="getdata(item)">
            <div class="video" :style="{ backgroundImage: 'url(' + res_url_prefix + item.picture + ')' }">
                <div class="video_duration">{{ formatTime(item.play_duration) }}</div>
            </div>
            <div class="video_detail" @click.stop="xigua">
                <!-- <h4 class="video_name" :title="item.name">{{ item.name }}</h4> -->
                <p class="video_name">{{ item.name }}</p>
                <span :style="{ paddingLeft: '10px' }"> <i class="fa-solid fa-eye"></i> <span
                        :style="{ paddingLeft: '5PX' }">{{ item.hits }}</span> </span>
                <span :style="{ float: 'right', paddingRight: '20px' }">{{ fmtDate(item.release_time) }}
                </span>
            </div>
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    props: ["MovieList"],
    data() {
        return {
            HomeList: [],
        }

    },
    computed: {
        ...mapState({
            res_url_prefix: state => state.res_url_prefix,
        }),
        HomeList() {
            return this.MovieList
        }
    },
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                const height = this.$el.offsetHeight;
                this.$emit('updateHeight', height);
            }, 1000);
        });
    },
    methods: {
        xigua() {
            console.log('嘻嘻哈哈');
        },
        fmtDate(time) {
            let T = (time + '').length > 11 ? time : time * 1000;
            const date = new Date(T);
            return ('0' + date.getDate()).slice(-2) + '/' +
                ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
                date.getFullYear();
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
        getdata(data) {
            this.$emit('getMVdata', data)
        },
        isPromise(obj) {
            return !!obj && typeof obj.then === 'function';
        }
    }
}
</script>
<style scoped lang="less">
h4 {
    margin-top: 0;
    margin-bottom: 0;
}

/* 移动端 */
@media (max-width: 768px) {
    .play_list {
        text-align: left;
        margin-top: 10px;
        margin-bottom: 20px;
        color: #fff;

        .play_list_item {
            width: 96%;
            min-height: 250px;
            margin-left: 2%;
            background: #ccc;
            border-radius: 5px;
            overflow: hidden;
            margin-top: 20px;
            position: relative;
            box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);

            .video {
                width: 100%;
                height: 280px;
                background-size: cover;
                background-position: center;
                position: relative;

                .video_duration {
                    width: 80px;
                    height: 30px;
                    background-color: rgba(0, 0, 0, 0.5);
                    position: absolute;
                    text-align: center;
                    line-height: 30px;
                    bottom: 80px;
                    right: 10px;
                    border-radius: 9px;
                }
            }

            .video_detail {
                width: 100%;
                // min-height: 50px;
                height: 70px;
                // background: #fff;
                // background-color: rgba(0, 0, 0, 0.5);
                background-color: #2e2e2e;
                position: absolute;
                bottom: 0;

                /* 超出部分显示省略号 */
                .video_name {
                    margin: 10px 0 0 10px;
                    white-space: nowrap;
                    /* 保证文字在一行显示 */
                    overflow: hidden;
                    /* 隐藏超出部分 */
                    text-overflow: ellipsis;
                }
            }


        }



    }


}

/* PC端 */
@media (min-width: 768px) {
    .play_list {
        text-align: left;
        margin-top: 10px;
        margin-bottom: 20px;
        color: #fff;
        display: flex;
        justify-content: flex-start;

        flex-wrap: wrap;

        .play_list_item {
            width: 30%;
            min-height: 250px;
            margin-left: 2%;
            background: #ccc;
            border-radius: 5px;
            overflow: hidden;
            margin-top: 20px;
            margin-bottom: 20px;
            position: relative;
            // box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);

            .video {
                width: 100%;
                height: 300px;
                background-size: cover;
                background-position: center;

                .video_duration {
                    width: 80px;
                    height: 30px;
                    background-color: rgba(0, 0, 0, 0.5);
                    position: absolute;
                    text-align: center;
                    line-height: 30px;
                    bottom: 80px;
                    right: 10px;
                    border-radius: 9px;
                }
            }

            .video_detail {
                width: 100%;
                min-height: 70px;
                // background-color: rgba(0, 0, 0, 0.5);
                background-color: #2e2e2e;
                position: absolute;
                bottom: 0;


                /* 超出部分显示省略号 */
                .video_name {
                    margin: 10px 0 0 10px;
                    white-space: nowrap;
                    /* 保证文字在一行显示 */
                    overflow: hidden;
                    /* 隐藏超出部分 */
                    text-overflow: ellipsis;
                }
            }


        }



    }
}
</style>
