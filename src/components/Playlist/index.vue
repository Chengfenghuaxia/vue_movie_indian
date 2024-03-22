<template>
    <div class="play_list">
        <div class="play_list_item" v-for="(item, index) in MovieList" :key="index" @click="getdata(item)">
            <div class="video" :style="{ backgroundImage: 'url(' + item.picture + ')' }">

            </div>
            <div class="video_detail">
                <h4 class="video_name">{{ item.name }}</h4>
                <span :style="{ paddingLeft: '10px' }">play Count:{{ item.hits }} </span>
                <span :style="{ float: 'right', paddingRight: '20px' }">release date:{{ fmtDate(item.release_time) }} </span>
            </div>
        </div>

    </div>
</template>
<script>

export default {
    props: ["MovieList"],
    data() {
        return {

        }

    },
    mounted() { },
    computed: {

    },
    methods: {
        fmtDate(time) {
            const date = new Date(time);
            return date.getFullYear() + '-' +
                ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                ('0' + date.getDate()).slice(-2);
        },
        getdata(data) {
            this.$emit('getMVdata', data)
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
                height: 200px;
                background-size: cover;
                background-position: center;
            }

            .video_detail {
                width: 100%;
                min-height: 50px;
                background: #fff;
                position: absolute;
                bottom: 0;

                .video_name {
                    margin: 10px 0 0 10px;
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
        
        flex-wrap:wrap;
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
                min-height: 50px;
                background: #fff;
                position: absolute;
                bottom: 0;

                .video_name {
                    margin: 10px 0 0 10px;
                }
            }


        }



    }
}
</style>