<template>
    <div class="play_list">
        <div class="play_list_item" v-for="(item, index) in HomeList" :key="index" @click="getdata(item)">
            <div class="video" :style="{ backgroundImage: 'url(' + res_url_prefix + item.picture + ')' }">

            </div>
            <div class="video_detail">
                <h4 class="video_name" :title="item.name">{{ item.name }}</h4>
                <span :style="{ paddingLeft: '10px' }">play Count:{{ item.hits }} </span>
                <span :style="{ float: 'right', paddingRight: '20px' }">release date:{{ fmtDate(item.release_time) }}
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
            text: "这是一段很长的文本，需要在容器宽度不够的情况下显示省略号，并且在鼠标悬停时显示完整内容。"
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
    methods: {
        fmtDate(time) {
            let T = (time + '').length > 11 ? time : time * 1000
            const date = new Date(T);
            return date.getFullYear() + '-' +
                ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                ('0' + date.getDate()).slice(-2);
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
        color: rgb(61, 126, 216);

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
            }

            .video_detail {
                width: 100%;
                // min-height: 50px;
                height: 70px;
                background: #fff;
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
        color: rgb(61, 126, 216);
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
            box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);

            .video {
                width: 100%;
                height: 200px;
                background-size: cover;
                background-position: center;
            }

            .video_detail {
                width: 100%;
                min-height: 70px;
                background: #fff;
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