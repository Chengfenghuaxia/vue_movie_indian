<template>
    <div>
        <a :href="dialogVg[0].jump_url">
            <div v-show="leftshow" class="left_advertise"
                :style="{ backgroundImage: 'url(' + dialogVg[0].image + ')' }">
                <van-icon @click.prevent="close('l')" name="cross" :style="{ marginLeft: '80px', color: '#000' }" />
            </div>
        </a>
        <a :href="dialogVg[1].jump_url">
            <div v-show="rightshow" class="right_advertise"
                :style="{ backgroundImage: 'url(' + dialogVg[1].image + ')' }">
                <van-icon @click.prevent="close('r')" name="cross" :style="{ marginLeft: '80px', color: '#000' }" />
                
            </div>
        </a>

    </div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ApiPost } from "../../utils/request";
export default {
    props: ["dvData"],
    data() {
        return {
            leftshow: false,
            rightshow: false,
            dialogVg: [
                {
                    image: "",
                    jump_url: ""
                }, {
                    image: "",
                    jump_url: ""
                }
            ],

        }
    },

    created() {

    },
    mounted() {

        this.getAdver()
    },
    methods: {
        close(e) {
            if (e == 'l') {
                this.leftshow = false
            } else {
                this.rightshow = false
            }
        },
        getAdver() {
            ApiPost("/advertise/getdata", { type: 2 }).then(res => {
                this.dialogVg = res.data.list?res.data.list:[{image:""},{image:""}]
            })
        }
    }
}
</script>
<style scoped>
.left_advertise {
    width: 110px;
    height: 200px;
    position: fixed;
    top: 300px;
    z-index: 999;
    background-size: cover;
    background-position: center;
}

.right_advertise {
    width: 110px;
    height: 200px;
    position: fixed;
    top: 300px;
    right: 0;
    z-index: 999;
    background-size: cover;
    background-position: center;

    display: inline-block;
}
.chacha{
    width: 50px;
    height: 50px;
    background: red;
}
</style>