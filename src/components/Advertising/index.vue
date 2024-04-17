<template>
    <div>
        <div class="advertise" v-for="(item, index) in advertiseList" :key="index" @click="addone(item)">
            <a :href="item.jump_url"><img class="img" :src="ADres_url_prefix+item.image" alt=""></a>
        </div>
       
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { ApiGet } from "../../utils/request";
export default {
    props:["advertiseList"],
    data() {
        return {
        
        }

    },
    computed: {
        ...mapState({
            ADres_url_prefix: state => state.ADres_url_prefix,
        }),
    },
    mounted() {
        setTimeout(() => {
            const height = this.$el.offsetHeight;
            this.$emit("getadheight", height)
        }, 1000);
    },
    methods: {
        addone(raw) {
            ApiGet("/advertise/addclickstats",{id:raw.id})
        }
    }
}
</script>
<style scoped>
/* 移动端 */
@media (max-width: 48rem) {
    .advertise {
    width: 100%;
    height: 70px;
    background-color: fff;
}

.img {
    width: 100%;
    height: 70px;
}
}
/* PC端 */
@media (min-width: 48rem) {
    .advertise {
    width: 100%;
    height: 130px;
    background-color: fff;
}

.img {
    width: 100%;
    height: 140px;
}
}




.title {
    width: 22%;
    height: 80px;
    color: #000;
    line-height: 80px
}

.item_type {
    width: 78%;
    height: 80px;
    color: #000;
}


</style>